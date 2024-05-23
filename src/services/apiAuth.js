/* eslint-disable no-unused-vars */
import supabase, { supabaseUrl } from "./supabase";

export async function signUp({ fullName, email, password }) {
   let { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
         data: {
            fullName,
            avatar: "",
         },
      },
   });
   if (error) throw new Error(error.message);
   return data;
}

export async function login({ email, password }) {
   let { data, error } = await supabase.auth.signInWithPassword({ email, password });

   if (error) throw new Error(error.message);
   return data;
}

export async function getCurrentUser() {
   const { data: session } = await supabase.auth.getSession();
   if (!session.session) return null;

   const { data, error } = await supabase.auth.getUser();

   if (error) throw new Error(error.message);
   return data?.user;
}

export async function logout() {
   const { error } = await supabase.auth.signOut();
   if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
   //1. Update password OR fullName
   let updatedData;
   if (password) {
      updatedData = { password };
   }

   if (fullName) {
      updatedData = {
         data: {
            fullName,
         },
      };
   }

   const { data, error } = await supabase.auth.updateUser(updatedData);
   if (error) throw new Error(error.message);

   if (!avatar) return data;

   //2. Upload avatar image
   const fileName = `avatar-${data.user.id}-${Math.random()}`;
   const { error: storageError } = await supabase.storage.from("avatars").upload(fileName, avatar);

   if (storageError) throw new Error(storageError.message);
   //3. Update avatar in the user
   const { data: updatedUser, error: updateError } = await supabase.auth.updateUser({
      data: {
         avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
   });
   if (updateError) throw new Error(updateError.message);
   return updatedUser;
}
