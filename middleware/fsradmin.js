export default function ({
  store,
  redirect
}) {
  // If the user is not authenticated
  if (!store.getters['authentication/isFsrAdmin']) {
    return redirect('/')
  }
}
