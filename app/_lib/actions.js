"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be signed in to update your profile.");
  }

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9][A-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Please enter a valid national ID number.");
  }

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) {
    throw new Error("Guest could not be updated");
  }

  revalidatePath("/account/profile"); // Revalidate the profile page to show the updated data. Cache revalidation.
  // revalidate("/account/profile");  // Revalidate the profile page to show the updated data. Cache revalidation.
}

export async function updateReservation(formData) {
  const reservationId = Number(formData.get("reservationId"));
  const session = await auth();
  if (!session) throw new Error("You must be logged in.");
  const guestBookings = await getBookings(session.user.guestId);

  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(reservationId)) {
    throw new Error("You can only update your own reservations.");
  }

  const updatedFields = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000), // Limit observations to 1000 characters to prevent abuse
  };

  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", reservationId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }

  revalidatePath("/account/reservations"); // Revalidate the reservations page to show the updated data. Cache revalidation.
  revalidatePath(`/account/reservations/edit/${reservationId}`); // Revalidate the specific reservation page to show the updated data. Cache revalidation.
  redirect("/account/reservations"); // Redirect to the reservations page after updating. This is optional, but it can be a good UX choice to show the user their updated reservation immediately.
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in.");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId)) {
    throw new Error("You can only delete your own reservations.");
  }

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
