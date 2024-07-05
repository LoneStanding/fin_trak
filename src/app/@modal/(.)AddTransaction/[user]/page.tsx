import { Modal } from "./modal";
import FormTransaction from "~/app/_components/FormTransaction"; 

export default async function FormModal() {
  return (
    <div>
    <Modal>
      <FormTransaction />
    </Modal>
    </div>
  );
}