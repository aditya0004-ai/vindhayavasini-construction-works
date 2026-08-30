import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Upload,
  X,
  Plus,
  Trash2,
  Save,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import {
  createProject,
  updateProject,
  getAdminProjects,
  deleteGalleryImage,
} from "../lib/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import Toast from "../components/Toast";

const MAX_GALLERY_IMAGES = 10;

const ProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const mainImageRef = useRef(null);
  const layoutPlanRef = useRef(null);
  const galleryRef = useRef(null);

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [existingGallery, setExistingGallery] =
    useState([]);

  const [form, setForm] = useState({
    name: "",
    status: "Upcoming",
    location: "",
    overview: "",
    highlights: [""],
    displayOrder: 0,
    published: false,
  });

  const [mainImage, setMainImage] =
    useState(null);

  const [layoutPlan, setLayoutPlan] =
    useState(null);

  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    if (isEdit) {
      loadProject();
    }
  }, [id]);

  const loadProject = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getAdminProjects();

      const projects =
        response.projects ||
        response.data?.projects ||
        response.data ||
        [];

      const project = projects.find(
        (item) => item._id === id
      );

      if (!project) {
        throw new Error(
          "Project not found."
        );
      }

      setForm({
        name: project.name || "",
        status:
          project.status || "Upcoming",
        location:
          project.location || "",
        overview:
          project.overview || "",
        highlights:
          Array.isArray(project.highlights) &&
          project.highlights.length
            ? project.highlights
            : [""],
        displayOrder:
          project.displayOrder ?? 0,
        published:
          project.published === true,
      });

      setExistingGallery(
        Array.isArray(project.gallery)
          ? project.gallery
          : []
      );
    } catch (err) {
      setError(
        err.message ||
          "Unable to load project."
      );
    } finally {
      setLoading(false);
    }
  };

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const updateHighlight = (
    index,
    value
  ) => {
    setForm((current) => {
      const highlights = [
        ...current.highlights,
      ];

      highlights[index] = value;

      return {
        ...current,
        highlights,
      };
    });
  };

  const addHighlight = () => {
    setForm((current) => ({
      ...current,
      highlights: [
        ...current.highlights,
        "",
      ],
    }));
  };

  const removeHighlight = (index) => {
    setForm((current) => {
      const highlights =
        current.highlights.filter(
          (_, itemIndex) =>
            itemIndex !== index
        );

      return {
        ...current,
        highlights:
          highlights.length
            ? highlights
            : [""],
      };
    });
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(
      e.target.files || []
    );

    const remaining =
      MAX_GALLERY_IMAGES -
      existingGallery.length -
      gallery.length;

    if (remaining <= 0) {
      setError(
        `Maximum ${MAX_GALLERY_IMAGES} gallery images are allowed.`
      );

      e.target.value = "";
      return;
    }

    const selected = files.slice(
      0,
      remaining
    );

    setGallery((current) => [
      ...current,
      ...selected,
    ]);

    e.target.value = "";
  };

  const removeNewGalleryImage = (
    index
  ) => {
    setGallery((current) =>
      current.filter(
        (_, itemIndex) =>
          itemIndex !== index
      )
    );
  };

  const handleDeleteExistingGallery = async (
    image
  ) => {
    if (!isEdit) return;

    const publicId =
      image.publicId ||
      image.public_id;

    if (!publicId) {
      setError(
        "This gallery image does not have a Cloudinary public ID."
      );
      return;
    }

    const confirmed = window.confirm(
      "Delete this gallery image?"
    );

    if (!confirmed) return;

    try {
      setError("");

      await deleteGalleryImage(
        id,
        publicId
      );

      setExistingGallery((current) =>
        current.filter(
          (item) =>
            (item.publicId ||
              item.public_id) !==
            publicId
        )
      );

      setSuccess(
        "Gallery image deleted."
      );
    } catch (err) {
      setError(
        err.message ||
          "Unable to delete gallery image."
      );
    }
  };

  const validate = () => {
    if (!form.name.trim()) {
      return "Project name is required.";
    }

    if (!form.location.trim()) {
      return "Project location is required.";
    }

    if (!form.overview.trim()) {
      return "Project overview is required.";
    }

    const validHighlights =
      form.highlights.filter(
        (item) => item.trim()
      );

    if (!validHighlights.length) {
      return "Add at least one project highlight.";
    }

    if (
      existingGallery.length +
        gallery.length >
      MAX_GALLERY_IMAGES
    ) {
      return `Maximum ${MAX_GALLERY_IMAGES} gallery images are allowed.`;
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const validationError =
      validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append(
        "name",
        form.name.trim()
      );

      formData.append(
        "status",
        form.status
      );

      formData.append(
        "location",
        form.location.trim()
      );

      formData.append(
        "overview",
        form.overview.trim()
      );

      formData.append(
        "displayOrder",
        String(form.displayOrder || 0)
      );

      formData.append(
        "published",
        String(form.published)
      );

      /*
       * Backend can parse JSON arrays.
       */
      formData.append(
        "highlights",
        JSON.stringify(
          form.highlights.filter(
            (item) => item.trim()
          )
        )
      );

      if (mainImage) {
        formData.append(
          "mainImage",
          mainImage
        );
      }

      if (layoutPlan) {
        formData.append(
          "layoutPlan",
          layoutPlan
        );
      }

      gallery.forEach((file) => {
        formData.append(
          "gallery",
          file
        );
      });

      if (isEdit) {
        await updateProject(
          id,
          formData
        );

        setSuccess(
          "Project updated successfully."
        );

        setTimeout(() => {
          navigate("/admin/projects");
        }, 700);
      } else {
        await createProject(
          formData
        );

        setSuccess(
          "Project created successfully."
        );

        setTimeout(() => {
          navigate("/admin/projects");
        }, 700);
      }
    } catch (err) {
      setError(
        err.message ||
          "Unable to save project."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-5 sm:p-8 max-w-6xl mx-auto">
      <Toast
        message={error || success}
        type={error ? "error" : "success"}
        onClose={() => {
          setError("");
          setSuccess("");
        }}
      />

      <div className="flex items-center gap-3 mb-7">
        <Link
          to="/admin/projects"
          className="w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
        </Link>

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {isEdit
              ? "Edit Project"
              : "Add Project"}
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            {isEdit
              ? "Update project information and media."
              : "Create a new construction project."}
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* BASIC INFORMATION */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              Basic Information
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Enter the main project details.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Project Name *
              </label>

              <input
                value={form.name}
                onChange={(e) =>
                  updateField(
                    "name",
                    e.target.value
                  )
                }
                placeholder="e.g. Vindhayavasini Heights"
                className="w-full h-12 border border-slate-200 rounded-xl px-4 outline-none focus:border-slate-900"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Location *
              </label>

              <input
                value={form.location}
                onChange={(e) =>
                  updateField(
                    "location",
                    e.target.value
                  )
                }
                placeholder="Project location"
                className="w-full h-12 border border-slate-200 rounded-xl px-4 outline-none focus:border-slate-900"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Status *
              </label>

              <select
                value={form.status}
                onChange={(e) =>
                  updateField(
                    "status",
                    e.target.value
                  )
                }
                className="w-full h-12 border border-slate-200 rounded-xl px-4 bg-white outline-none focus:border-slate-900"
              >
                <option value="Upcoming">
                  Upcoming
                </option>

                <option value="Ongoing">
                  Ongoing
                </option>

                <option value="Completed">
                  Completed
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Display Order
              </label>

              <input
                type="number"
                min="0"
                value={form.displayOrder}
                onChange={(e) =>
                  updateField(
                    "displayOrder",
                    Number(e.target.value)
                  )
                }
                className="w-full h-12 border border-slate-200 rounded-xl px-4 outline-none focus:border-slate-900"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Overview *
              </label>

              <textarea
                value={form.overview}
                onChange={(e) =>
                  updateField(
                    "overview",
                    e.target.value
                  )
                }
                rows={6}
                placeholder="Write a detailed overview of the project..."
                className="w-full border border-slate-200 rounded-xl p-4 outline-none focus:border-slate-900 resize-y"
              />
            </div>
          </div>
        </section>

        {/* HIGHLIGHTS */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Project Highlights
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Add important project features.
              </p>
            </div>

            <button
              type="button"
              onClick={addHighlight}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-950 text-white text-sm font-semibold"
            >
              <Plus size={16} />
              Add
            </button>
          </div>

          <div className="space-y-3">
            {form.highlights.map(
              (highlight, index) => (
                <div
                  key={index}
                  className="flex gap-3"
                >
                  <input
                    value={highlight}
                    onChange={(e) =>
                      updateHighlight(
                        index,
                        e.target.value
                      )
                    }
                    placeholder={`Highlight ${
                      index + 1
                    }`}
                    className="flex-1 h-12 border border-slate-200 rounded-xl px-4 outline-none focus:border-slate-900"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeHighlight(
                        index
                      )
                    }
                    className="w-12 h-12 rounded-xl border border-red-200 text-red-600 flex items-center justify-center hover:bg-red-50"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              )
            )}
          </div>
        </section>

        {/* MAIN IMAGE */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              Main Project Image
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Upload the primary project image.
            </p>
          </div>

          <input
            ref={mainImageRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              setMainImage(
                e.target.files?.[0] ||
                  null
              )
            }
          />

          {mainImage ? (
            <div className="relative max-w-xl rounded-2xl overflow-hidden border border-slate-200">
              <img
                src={URL.createObjectURL(
                  mainImage
                )}
                alt="Selected main"
                className="w-full h-72 object-cover"
              />

              <button
                type="button"
                onClick={() =>
                  setMainImage(null)
                }
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center"
              >
                <X size={17} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() =>
                mainImageRef.current?.click()
              }
              className="w-full max-w-xl h-64 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center hover:border-slate-900 hover:bg-slate-50 transition"
            >
              <ImageIcon
                size={38}
                className="text-slate-400"
              />

              <p className="font-semibold text-slate-700 mt-4">
                Upload main image
              </p>

              <p className="text-xs text-slate-400 mt-1">
                JPG, PNG, WEBP
              </p>
            </button>
          )}
        </section>

        {/* LAYOUT PLAN */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              Layout Plan
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Upload the project layout plan.
            </p>
          </div>

          <input
            ref={layoutPlanRef}
            type="file"
            accept="image/*,.pdf"
            className="hidden"
            onChange={(e) =>
              setLayoutPlan(
                e.target.files?.[0] ||
                  null
              )
            }
          />

          <button
            type="button"
            onClick={() =>
              layoutPlanRef.current?.click()
            }
            className="w-full border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center hover:border-slate-900 hover:bg-slate-50"
          >
            {layoutPlan ? (
              <>
                <FileText
                  size={38}
                  className="text-slate-500"
                />

                <p className="font-semibold text-slate-800 mt-3">
                  {layoutPlan.name}
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  Click to replace
                </p>
              </>
            ) : (
              <>
                <Upload
                  size={38}
                  className="text-slate-400"
                />

                <p className="font-semibold text-slate-700 mt-3">
                  Upload layout plan
                </p>

                <p className="text-xs text-slate-400 mt-1">
                  PDF or image
                </p>
              </>
            )}
          </button>
        </section>

        {/* GALLERY */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Project Gallery
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Maximum {MAX_GALLERY_IMAGES} images.
              </p>
            </div>

            <button
              type="button"
              disabled={
                existingGallery.length +
                  gallery.length >=
                MAX_GALLERY_IMAGES
              }
              onClick={() =>
                galleryRef.current?.click()
              }
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-950 text-white text-sm font-semibold disabled:opacity-40"
            >
              <Upload size={16} />
              Upload Images
            </button>
          </div>

          <input
            ref={galleryRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleGalleryChange}
          />

          {/* Existing gallery */}
          {existingGallery.length >
            0 && (
            <div className="mb-7">
              <p className="text-sm font-semibold text-slate-700 mb-3">
                Existing Images
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {existingGallery.map(
                  (image, index) => {
                    const imageUrl =
                      image.url ||
                      image.secure_url;

                    return (
                      <div
                        key={
                          image.publicId ||
                          image.public_id ||
                          index
                        }
                        className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200"
                      >
                        {imageUrl && (
                          <img
                            src={imageUrl}
                            alt={`Gallery ${
                              index + 1
                            }`}
                            className="w-full h-full object-cover"
                          />
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteExistingGallery(
                              image
                            )
                          }
                          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/95 text-red-600 flex items-center justify-center shadow"
                        >
                          <Trash2
                            size={15}
                          />
                        </button>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}

          {/* New gallery */}
          {gallery.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-3">
                New Images
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {gallery.map(
                  (file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200"
                    >
                      <img
                        src={URL.createObjectURL(
                          file
                        )}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeNewGalleryImage(
                            index
                          )
                        }
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/95 text-red-600 flex items-center justify-center shadow"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {existingGallery.length ===
            0 &&
            gallery.length === 0 && (
              <div className="py-12 text-center border-2 border-dashed border-slate-200 rounded-2xl">
                <ImageIcon
                  size={36}
                  className="mx-auto text-slate-300"
                />

                <p className="text-sm text-slate-500 mt-3">
                  No gallery images selected.
                </p>
              </div>
            )}
        </section>

        {/* PUBLISH */}
        <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7">
          <div className="flex items-center justify-between gap-5">
            <div>
              <h2 className="font-bold text-slate-900">
                Publish Project
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Published projects can appear on the public website.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                updateField(
                  "published",
                  !form.published
                )
              }
              className={`relative w-14 h-8 rounded-full transition ${
                form.published
                  ? "bg-slate-950"
                  : "bg-slate-300"
              }`}
            >
              <span
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition ${
                  form.published
                    ? "left-7"
                    : "left-1"
                }`}
              />
            </button>
          </div>
        </section>

        {/* ACTIONS */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pb-10">
          <Link
            to="/admin/projects"
            className="h-12 px-6 rounded-xl border border-slate-200 bg-white flex items-center justify-center font-semibold text-sm text-slate-700"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="h-12 px-7 rounded-xl bg-slate-950 text-white flex items-center justify-center gap-2 font-semibold text-sm disabled:opacity-60"
          >
            <Save size={17} />

            {saving
              ? "Saving..."
              : isEdit
              ? "Update Project"
              : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;