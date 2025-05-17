import { Dispatch, SetStateAction } from "react";
import { UserType } from "@/lib/types";

type UserTypeSelectorProps = {
  userType: UserType;
  setUserType: Dispatch<SetStateAction<UserType>>;
};

export function UserTypeSelector({ userType, setUserType }: UserTypeSelectorProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex -mb-px">
          <button
            className={`px-4 py-3 text-sm sm:text-base font-medium border-b-2 transition-colors ${
              userType === "resident"
                ? "text-primary border-primary"
                : "text-muted-foreground hover:text-secondary border-transparent"
            }`}
            onClick={() => setUserType("resident")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5 inline-block mr-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Voor bewoners
          </button>
          <button
            className={`px-4 py-3 text-sm sm:text-base font-medium border-b-2 transition-colors ${
              userType === "technician"
                ? "text-primary border-primary"
                : "text-muted-foreground hover:text-secondary border-transparent"
            }`}
            onClick={() => setUserType("technician")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5 inline-block mr-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
            Voor monteurs
          </button>
        </div>
      </div>
    </div>
  );
}
