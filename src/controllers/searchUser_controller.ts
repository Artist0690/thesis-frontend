import { AxiosInstance } from "axios";
import z from "zod";
import { toast } from "sonner";
import { UserSchema } from "../zod/userSchema";

type User = z.infer<typeof UserSchema>;

type Params = {
  name: string;
  fetcher: AxiosInstance;
  setUsers: React.Dispatch<React.SetStateAction<User[] | null>>;
};

export const searchUser_controller = async (params: Params) => {
  const { fetcher, name, setUsers } = params;

  const payload = { name };
  fetcher
    .get(`auth/search?name=${name}`)
    .then((response) => {
      const users = z.array(UserSchema).safeParse(response.data);
      if (!users.success) {
        toast.info("User type Mismatch", {
          duration: 3000,
          position: "top-right",
        });
        console.log(users.error);
        return;
      }
      console.log(users.data);
      setUsers(users.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
