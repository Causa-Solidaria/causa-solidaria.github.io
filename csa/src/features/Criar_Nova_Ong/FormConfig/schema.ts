import { z } from "zod";

const formSchema = z.object({});

export default formSchema;
export type formSchemaType = z.infer<typeof formSchema>;
