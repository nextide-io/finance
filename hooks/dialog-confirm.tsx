// import { Button } from "@/components/ui/button";
// import { Dialog, DialogFooter, DialogHeader } from "@/components/ui/dialog";
// import {
//   DialogContent,
//   DialogDescription,
//   DialogTitle,
// } from "@radix-ui/react-dialog";
// import { useState } from "react";

// export const useConfirm = (
//   title: string,
//   mesage: string
// ): [() => JSX.Element, () => Promise<unknown>] => {
//   const [promise, setPromise] = useState<{
//     resolve: (value: boolean) => void;
//   } | null>(null);

//   const confirm = () =>
//     new Promise((resolve, reject) => {
//       setPromise({ resolve });
//     });

//   const handleClose = () => {
//     setPromise(null);
//   };

//   const handleConfirm = () => {
//     promise?.resolve(true);
//     handleClose();
//   };
//   const handleCancel = () => {
//     promise?.resolve(false);
//     handleClose();
//   };

//   const ConfirmDialog = () => (
//     <Dialog open={promise !== null}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>{title}</DialogTitle>
//           <DialogDescription>{mesage}</DialogDescription>
//         </DialogHeader>
//         <DialogFooter className="pt-2">
//           <Button onClick={handleCancel} variant="outline">
//             Cancel
//           </Button>
//           <Button onClick={handleConfirm}>Confirm</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );

//   return [ConfirmDialog, confirm];
// };
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resolve } from "path";
import { useState } from "react";

export const useConfirm = (
  title: string,
  description: string
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () =>
    new Promise((resolve, reject) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };
  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-2 flex gap-4">
          <Button onClick={handleCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmDialog, confirm];
};
