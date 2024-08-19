import EdiAccountSheet from "@/features/accounts/components/EditAccountSheet";
import NewAccountSheet from "@/features/accounts/components/newAccountSheet";
import EdiCategorySheet from "@/features/categories/components/EditCategorySheet";
import NewCategorySheet from "@/features/categories/components/newCategorySheet";
import EdiTransactionSheet from "@/features/transactions/components/EdittransactionSheet";
import NewTransactionSheet from "@/features/transactions/components/newTransactionSheet";

const SheetProvider = () => {
  return (
    <>
      <EdiAccountSheet />
      <NewAccountSheet />

      <EdiCategorySheet />
      <NewCategorySheet />

      <EdiTransactionSheet />
      <NewTransactionSheet />
    </>
  );
};

export default SheetProvider;
