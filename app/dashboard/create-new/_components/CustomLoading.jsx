"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";

const CustomLoading = ({ loading, progress }) => {
  if (!loading) return null; 

  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="bg-black text-center p-6 rounded-lg shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white text-lg font-bold">
            Processing...
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <div className="flex flex-col items-center justify-center space-y-4">
            {progress !== undefined && (
              <Progress
                value={progress}
                className="w-full h-2 bg-gray-700 rounded-full"
              />
            )}
              Your request is being processed. Please wait a moment.
          </div>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomLoading;
