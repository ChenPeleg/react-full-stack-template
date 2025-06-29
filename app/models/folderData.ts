import { FolderJobType } from "~/models/FolderJobType";
import { FolderPath } from "@prisma/client";

export interface FolderData extends Omit<FolderPath, "id" | "type"> {
  id: string | number;
  type?: FolderJobType;
}
