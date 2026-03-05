/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCreateSubscriptionPlanMutation,
  useDeleteSubscriptionPlanMutation,
  useGetAllSubscriptionsQuery,
  useUpdateSubscriptionPlanMutation,
} from "../../redux/Features/SubscriptionPlans/subscriptionPlansApi";
import Table from "../../components/reusable/Table/Table";
import Modal from "../../components/reusable/Modal/Modal";
import Loader from "../../components/shared/Loader/Loader";
import TextInput from "../../components/reusable/TextInput/TextInput";
import Textarea from "../../components/reusable/TextArea/TextArea";
import Button from "../../components/reusable/Button/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import SelectDropdown from "../../components/reusable/SelectDropdown/SelectDropdown";
import toast from "react-hot-toast";
import { FiEdit, FiTrash2 } from "react-icons/fi";

type TFormData = {
  priority: number | any;
  code: string;
  description: string;
  type: "SUBSCRIPTION" | "ADD_ON";
  priceInPaise: number;
  status: "DRAFT" | "COMPLETE";
  profileVisibility: string;
  active: boolean;
  callLimits: number;
  chatLimits: number;
  validity: number;
};
const SubscriptionPlans = () => {
  const { data, isLoading } = useGetAllSubscriptionsQuery({});
  const [createSubscriptionPlan, { isLoading: isCreatingNewPlan }] =
    useCreateSubscriptionPlanMutation();
  const [updateSubscriptionPlan, { isLoading: isUpdatingPlan }] =
    useUpdateSubscriptionPlanMutation();
  const [deleteSubscriptionPlan] = useDeleteSubscriptionPlanMutation();
  const [modalType, setModalType] = useState<string>("add");
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [isAddPlanModalOpen, setIsAddPlanModalOpen] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TFormData>();

  const columns: any = [
    {
      key: "priority",
      header: "Priority",
      render: (item: any) => (
        <div className="font-medium text-gray-900">{item.priority}</div>
      ),
    },
    {
      key: "code",
      header: "Plan Code",
      render: (item: any) => (
        <div className="font-medium text-gray-900">{item.code || "-"}</div>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (item: any) => <div>{item.description || "-"}</div>,
    },
    {
      key: "priceInPaise",
      header: "Price",
      render: (item: any) => (
        <div>₹ {(item.priceInPaise / 100).toFixed(2)}</div>
      ),
    },

    {
      key: "profileVisibility",
      header: "Profile Visibility",
      render: (item: any) => <div>{item.profileVisibility || "-"}</div>,
    },

    {
      key: "callLimits",
      header: "Call Limits",
      render: (item: any) => <div>{item.callLimits ?? "-"}</div>,
    },

    {
      key: "chatLimits",
      header: "Chat Limits",
      render: (item: any) => <div>{item.chatLimits ?? "-"}</div>,
    },

    {
      key: "validity",
      header: "Validity (Days)",
      render: (item: any) => <div>{item.validity ?? "-"}</div>,
    },

    {
      key: "type",
      header: "Type",
    },

    {
      key: "active",
      header: "Active",
      render: (item: any) => (
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            item.active
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {item.active ? "Yes" : "No"}
        </span>
      ),
    },

    {
      key: "status",
      header: "Status",
      render: (item: any) => {
        const statusStyles: Record<string, string> = {
          DRAFT: "bg-yellow-100 text-yellow-800",
          COMPLETE: "bg-green-100 text-green-800",
          ACTIVE: "bg-blue-100 text-blue-800",
          INACTIVE: "bg-gray-100 text-gray-800",
          REJECTED: "bg-red-100 text-red-800",
        };

        return (
          <span
            className={`px-2 py-1 text-xs rounded-full font-medium ${
              statusStyles[item.status] || "bg-gray-100 text-gray-800"
            }`}
          >
            {item.status}
          </span>
        );
      },
    },

    {
      key: "actions",
      header: "Actions",
      render: (item: any) => (
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleUpdate(item)}
            className="p-2 rounded-md bg-blue-100 text-blue-600 hover:bg-blue-200 transition cursor-pointer"
          >
            <FiEdit size={16} />
          </button>

          <button
            onClick={() => handleDeletePlan(item?.id)}
            className="p-2 rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition cursor-pointer"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  const handleAddOrUpdatePlan = async (
    data: TFormData,
    action: "add" | "update",
  ) => {
    try {
      const basePayload = {
        code: data.code,
        description: data.description,
        type: data.type,
        priceInPaise: data.priceInPaise * 100,
        status: data.status,
        priority: data.priority,
        profileVisibility: data.profileVisibility,
        active: String(data.active) === "true",
        callLimits: Number(data.callLimits),
        chatLimits: Number(data.chatLimits),
        validity: Number(data.validity),
      };

      let response;

      if (action === "add") {
        response = await createSubscriptionPlan(basePayload).unwrap();
      } else {
        response = await updateSubscriptionPlan({
          id: selectedPlanId,
          ...basePayload,
        }).unwrap();
      }

      if (response?.status === 200 || response?.status === 201) {
        toast.success(response.message);
        setIsAddPlanModalOpen(false);
        reset();
        setSelectedPlanId(null);
        setModalType("add");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const handleUpdate = (item: any) => {
    setModalType("update");
    setSelectedPlanId(item.id);
    setIsAddPlanModalOpen(true);

    setValue("code", item.code);
    setValue("description", item.description);
    setValue("type", item.type);
    setValue("priceInPaise", item.priceInPaise / 100);
    setValue("status", item.status);
    setValue("priority", item.priority);
    setValue("profileVisibility", item.profileVisibility);
    setValue("active", item.active);
    setValue("callLimits", item.callLimits);
    setValue("chatLimits", item.chatLimits);
    setValue("validity", item.validity);
  };

  const handleDeletePlan = async (id: string) => {
    try {
      const payload = {
        ids: [id],
        hard: true,
      };
      await toast.promise(deleteSubscriptionPlan(payload).unwrap(), {
        loading: "Loading...",
        success: "Plan deleted successfully!",
        error: "Failed to delete plan. Please try again.",
      });

      window.location.reload();
    } catch (err) {
      console.error("Error deleting plan:", err);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Subscription Plans
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage subscription plans in the system
          </p>
        </div>

        <button
          onClick={() => {
            setModalType("add");
            setIsAddPlanModalOpen(true);
          }}
          className="group relative py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Add New Plan
        </button>
      </div>

      <Table
        columns={columns}
        data={data?.data?.items || []}
        totalItems={data?.data?.total}
        isLoading={isLoading}
        page={data?.data?.page || 1}
        placeholder="Search by plan code"
      />

      <Modal
        isModalOpen={isAddPlanModalOpen}
        setIsModalOpen={setIsAddPlanModalOpen}
        heading={`${modalType === "add" ? "Add" : "Update"} New Plan`}
      >
        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-[2px] bg-white/30 z-50">
              <Loader size="lg" />
            </div>
          )}

          <form
            onSubmit={handleSubmit((data) =>
              handleAddOrUpdatePlan(data, modalType as "add" | "update"),
            )}
            className="flex flex-col gap-6 font-Nunito mt-5"
          >
            <div className="flex flex-col gap-6">
              {/* Priority */}
              <TextInput
                label="Priority"
                placeholder="Enter priority (e.g. 1)"
                error={errors.priority}
                {...register("priority", { required: "Priority is required" })}
              />
              {/* Plan Code */}
              <TextInput
                label="Plan Code"
                placeholder="Enter plan code (e.g. GOLD_PLAN)"
                error={errors.code}
                {...register("code", { required: "Plan code is required" })}
              />

              {/* Description */}
              <Textarea
                label="Description"
                placeholder="Enter plan description"
                error={errors.description}
                {...register("description", {
                  required: "Description is required",
                })}
              />

              {/* Plan Type */}
              <SelectDropdown
                label="Plan Type"
                options={[
                  { label: "Subscription", value: "SUBSCRIPTION" },
                  { label: "Addons", value: "ADD_ON" },
                ]}
                error={errors.type}
                {...register("type", { required: "Plan type is required" })}
              />

              {/* Price (in ₹, convert to paise in submit) */}
              <TextInput
                label="Price (₹)"
                type="number"
                placeholder="Enter price (e.g. 199)"
                error={errors.priceInPaise}
                {...register("priceInPaise", {
                  required: "Price is required",
                  valueAsNumber: true,
                })}
              />

              {/* Status */}
              <SelectDropdown
                label="Status"
                options={[
                  { label: "Draft", value: "DRAFT" },
                  { label: "Complete", value: "COMPLETE" },
                ]}
                error={errors.status}
                {...register("status", { required: "Status is required" })}
              />

              {/* Profile Visibility */}
              <SelectDropdown
                label="Profile Visibility"
                options={[
                  { label: "True", value: "ONE" },
                  { label: "False", value: "ZERO" },
                ]}
                error={errors.profileVisibility}
                {...register("profileVisibility", {
                  required: "Profile visibility is required",
                })}
              />

              {/* Active */}
              <SelectDropdown
                label="Active Status"
                options={[
                  { label: "True", value: "true" },
                  { label: "False", value: "false" },
                ]}
                error={errors.active}
                {...register("active", {
                  required: "Active status is required",
                })}
              />

              <TextInput
                label="Call Limits"
                type="number"
                placeholder="Enter call limits (e.g. 99)"
                error={errors.callLimits}
                {...register("callLimits", {
                  required: "Call limits is required",
                  valueAsNumber: true,
                })}
              />

              <TextInput
                label="Chat Limits"
                type="number"
                placeholder="Enter chat limits (e.g. 500)"
                error={errors.chatLimits}
                {...register("chatLimits", {
                  required: "Chat limits is required",
                  valueAsNumber: true,
                })}
              />

              <TextInput
                label="Validity (in days)"
                type="number"
                placeholder="Enter validity (e.g. 30)"
                error={errors.validity}
                {...register("validity", {
                  required: "Validity is required",
                  valueAsNumber: true,
                })}
              />
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                label={"Cancel"}
                variant="secondary"
                className="py-[7px] lg:py-[7px] w-full md:w-fit"
                onClick={() => {
                  setIsAddPlanModalOpen(false);
                  setModalType("add");
                }}
              />
              <Button
                type="submit"
                label={modalType === "add" ? "Add Plan" : "Update Plan"}
                variant="primary"
                isLoading={
                  modalType === "add" ? isCreatingNewPlan : isUpdatingPlan
                }
              />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default SubscriptionPlans;
