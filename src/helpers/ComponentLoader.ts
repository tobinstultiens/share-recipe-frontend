/**
 * Loads the component by path.
 * @param path The component path.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ComponentLoader(path: string): any {
  return import(`../components/${path}.vue`);
}
