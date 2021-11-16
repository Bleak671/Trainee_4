export function toEdit(loading, history) {
  sessionStorage.setItem("link", loading.value.data.Link)
  history.push({
    pathname: `/edit/${loading.value.data.PhotoId}`,
  });
}