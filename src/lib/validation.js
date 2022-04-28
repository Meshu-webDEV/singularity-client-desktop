import * as Yup from "yup";
import fileExtension from "file-extension";
import { normalize } from "./utils";
import { isNumber } from "lodash";

// Refactored validations with YUP:

// ==== JOIN VALIDATION ====
export const usernameSchema = Yup.string()
  .min(3, "Cannot be less than 3 characters")
  .max(24, "Cannot exceed 24 characters")
  .matches(
    /\d*(?:[a-zA-Z]){3,}\d*/,
    "Must contain at least 3 characters, and is not less than 3 nor more than 24 characters"
  )
  .required("required");

export const passwordSchema = Yup.string()
  .min(8, "Cannot be less than 8 characters")
  .max(50, "Cannot exceed 100 characters")
  .matches(
    /((?=.*\d)(?=.*[a-zA-Z])(?=.*[\W]).{8,50})/,
    "Must contain at least ONE number and ONE special character"
  )
  .required("required");

export const repeatPasswordSchema = Yup.string()
  .test(
    "repeat-password",
    "Passwords do not match",
    (v, ctx) => ctx.parent.password === v
  )
  .required("required");

export const emailSchema = Yup.string()
  .email("Invalid email")
  .required("required");

// ==== ROUNDS PROGRESS VALIDATION ====
export const killsSchema = Yup.number()
  .min(0, "Cannot be less than 0")
  .max(57, "Cannot exceed 57")
  .required("required");

export const placementSchema = Yup.number()
  .min(0, "Cannot be less than 0")
  .max(20, "Cannot exceed 20")
  .required("Required");

export const roundPointsSchema = Yup.object().shape({
  round: Yup.number(),
  table: Yup.array().of(
    Yup.object().shape({
      name: Yup.string(),
      kills: killsSchema,
      placement: placementSchema,
    })
  ),
});

// ==== TEMPLATES VALIDATION ====
export const templateNameSchema = Yup.string()
  .min(3, "Must be at least 3 character")
  .max(100, "Cannot exceed 100 characters")
  .required("Required");
export const templateDescriptionSchema = Yup.string().max(
  300,
  "Cannot exceed 300 characters"
);
export const templateVisibleSchema = Yup.boolean()
  .oneOf([true, false])
  .required("Required");

// ==== ORGANIZATION VALIDATION ====
export const organizationNameSchema = Yup.string()
  .min(3, "Cannot be less than 3 characters")
  .max(50, "Cannot be more than 50 characters")
  .required("Required");

export const organizationAboutSchema = Yup.string()
  .max(300, "Cannot be more than 300 characters")
  .min(25, "Cannot be less than 25 characters")
  .required();

export const organizationAvatarSchema = Yup.mixed()
  .test(
    "avatar-type",
    "Invalid image type, allowed: .jpg/.jpeg/.png",
    (value, ctx) => {
      if (!value) return true;
      const allowedExt = ["png", "jpg", "jpeg"];
      const allowedMimes = ["image/png", "image/jpeg"];
      const ext = fileExtension(value?.name);
      const mime = value?.type;
      if (!allowedExt.includes(ext) || !allowedMimes.includes(mime))
        return false;
      return true;
    }
  )
  .test(
    "avatar-size",
    "Invalid image size. Maximum size is 5 MB",
    (value, ctx) => {
      if (!value) return true;
      if (!value.size) return false;
      if (!String(value?.size).match(/^[0-9]+$/)) return false;
      const size = parseInt(value?.size);
      const maxSize = 50000000;
      if (size > maxSize) return false;
      return true;
    }
  )
  .required("Required");

// ==== PROFILE VALIDATION ====
export const displayNameSchema = Yup.string()
  .required("Required")
  .test(
    "display-name",
    "Must match username. Only 1 dash, spaces or capitalizations is allowed",
    (v, ctx) => {
      if (!v) return false;
      if (!v.toString().match(/^[a-z A-Z]+(-[a-z A-Z]+)?$/)) return false;

      return (
        normalize(
          ctx.parent.altered
            ? ctx.parent.username.slice(0, -5)
            : ctx.parent.username
        ) === normalize(v.replace(/-| /g, ""))
      );
    }
  )
  .required("Required");

// ==== DISCORD INTEGRATION VALIDATION ====
export const discordServerSchema = Yup.string()
  .min(1, "Server name must be at least 1 character")
  .max(100, "Server name cannot exceed 100 characters")
  .required("Server name is required");

export const discordChannelSchema = Yup.string()
  .min(1, "Channel name must be at least 1 character")
  .max(100, "Channel name cannot exceed 100 characters")
  .required("Channel name is required");

export const discordWebhookUrlSchema = Yup.string()
  .min(1, "Webhook URL must be at least 1 character")
  .max(200, "Webhook URL cannot exceed 100 characters")
  .required("Webhook URL is required");

// ==== EVENTS VALIDATIONS ====
export const statusSchema = Yup.array()
  .min(1, "Choose at least 1 status")
  .required("Event status is required");

// export const descriptionSchema = Yup.string().max(
//   2500,
//   'Description cannot exceed 2500 characters'
// );

// ==== NEW EVENT VALIDATIONS ====
export const nameSchema = Yup.string()
  .min(3, "Event name must be at least 3 characters")
  .max(50, "Event name cannot exceed 50 characters")
  .required("Event name is required");

export const descriptionSchema = Yup.string().max(
  2500,
  "Description cannot exceed 2500 characters"
);

export const roundsSchema = Yup.number()
  .min(1, "Cannot be less than 1")
  .max(24, "Cannot exceed 24 rounds")
  .integer("Must be a number")
  .positive("Cannot be less than 1")
  .required("Required");

export const isPublicSchema = Yup.boolean().oneOf([true, false]).required();

export const teamsSchema = Yup.array()
  .of(
    Yup.object().shape({
      players: Yup.array().nullable(true).notRequired(),
      uniqueid: Yup.string().nullable(true).notRequired(),
      name: Yup.string()
        .min(2, "Too short")
        .max(24, "Max 24 characters")
        .required("required"),
      creatable: Yup.boolean()
        .oneOf([true, false])
        .nullable(true)
        .notRequired(),
    })
  )
  .min(1, "Participated teams cannot be less than 1")
  .max(20, "Participated teams cannot exceed 20");

export const shouldCreateSchema = Yup.boolean().oneOf([true, false]);

// Discord webhooks ====
export const discordWebhooks = Yup.array()
  .of(Yup.object())
  .max(20, "Hooked discord channels cannot exceed 20");

// Points ====

export const pointPerKillSchema = Yup.number()
  .min(0, "Cannot be less than 0")
  .max(100, "Cannot exceed 100")
  .required("Required");

export const pointsSchema = Yup.array().of(
  Yup.number()
    .min(0, "Cannot be less than 0")
    .max(100, "Cannot exceed 100")
    .required("Required")
);

// Prizepool ====

export const hasPrizepoolSchema = Yup.boolean().oneOf([true, false]).required();

export const prizepoolSchema = Yup.number()
  .min(0, "Prizepool cannot be less than 0")
  .max(1000000000, "Prizepool cannot exceed 1 billion. 👀")
  .required("Prizepool is required");

export const remainingPrizepoolSchema = Yup.number().min(
  0,
  "Prizepool distribution exceeded the remaining"
);

export const prizepoolDistributionSchema = Yup.array().of(
  Yup.number()
    .min(0, "Cannot be less than 0")
    .max(1000000000, "Cannot exceed 1 billion")
    .required("Required")
);

// TODO: DELETE LATER
export const initialInfoSchema = Yup.object({
  name: Yup.string()
    .min(3, "Event name must be at least 3 characters")
    .max(50, "Event name cannot exceed 50 characters")
    .required("Event name is required"),
  rounds: Yup.number()
    .min(1, "Event rounds must be at least have 1 round")
    .max(16, "Event rounds cannot exceed 24 rounds")
    .integer("Event rounds must be a number")
    .positive("Event rounds cannot be negative")
    .required("Event rounds is required"),
  isPublic: Yup.boolean(),
});
