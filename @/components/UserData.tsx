import { Spinner } from "@/components/ui/spinner";
import type { InitData } from "@/lib/types";

interface UserDataProps {
  userData: InitData | null;
  loading: boolean;
  formatAuthDate: (auth_date: string | null | undefined) => string;
}

const UserData: React.FC<UserDataProps> = ({
  userData,
  loading,
  formatAuthDate,
}) => {
  return (
    <div>
      <div>For development purposes only:</div>
      <div className="mt-4 rounded border p-4 shadow">
        <h2 className="text-md mb-4 font-bold">User Information</h2>
        {loading ? (
          <Spinner />
        ) : userData ? (
          <>
            <p>
              <strong>ID:</strong> {userData.user?.id}
            </p>
            <p>
              <strong>First Name:</strong> {userData.user?.first_name}
            </p>
            <p>
              <strong>Last Name:</strong> {userData.user?.last_name}
            </p>
            <p>
              <strong>Username:</strong> {userData.user?.username}
            </p>
            <p>
              <strong>Chat Instance:</strong> {userData.chat_instance}
            </p>
            <p>
              <strong>Chat Type:</strong> {userData.chat_type}
            </p>
            <p>
              <strong>Auth Date:</strong> {formatAuthDate(userData.auth_date)}
            </p>
          </>
        ) : (
          <p>No Telegram Init Data.</p>
        )}
      </div>
    </div>
  );
};

export default UserData;
