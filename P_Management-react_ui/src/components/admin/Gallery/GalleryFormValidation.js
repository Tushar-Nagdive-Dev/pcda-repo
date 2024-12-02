import { z } from "zod";

export const GalleryFormValidation = z.object({
 event_name: '',
 type: '',
 active: '',
});
