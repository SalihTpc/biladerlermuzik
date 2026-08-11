import AuthGuard from "@/components/AuthGuard";
import BaglamaForm from "@/components/BaglamaForm";

const page = () => {
  return (
    <AuthGuard>
      <BaglamaForm />
    </AuthGuard>
  );
};

export default page;
