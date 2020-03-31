// export let mapRoutes = [
//   {
//     route: "/tlgu-slr/prdcts/nwoffpktlgu",
//     method: "POST",
//     description: "Add Product"
//   },
//   {
//     route: "/tlgu-slr/prdcts/nwoffpktlgu/clone/:id",
//     method: "POST",
//     description: "Add Product"
//   },
//   {
//     route: "/tlgu-slr/prdcts/",
//     method: "GET",
//     description: "View All Products"
//   },
//   {
//     route: "/tlgu-slr/prdcts/nwoffpktlgu/edit/:id",
//     method: "PUT",
//     description: "Update Product"
//   },
//   {
//     route: "/tlgu-slr",
//     method: "GET",
//     description: "View Summary Graph"
//   }
// ];

export let mapRoutes = {
  "/tlgu-slr/prdcts/nwoffpktlgu": "Add Product",

  "/tlgu-slr/prdcts/nwoffpktlgu/clone/id": "Add Product",

  "/tlgu-slr/prdcts": "View All Products",

  "/tlgu-slr/prdcts/nwoffpktlgu/edit/id": "Update Product",

  "/tlgu-slr": "View Summary",
  "/tlgu-slr/gallery": "Manage Gallery",
  "/tlgu-slr/gallery/upldimg": "Manage Gallery",

  "/tlgu-slr/shops": "Manage Shop",
  "/tlgu-slr/shops/newshp": "Manage Shop",

  "/tlgu-slr/qr-scanner": "Process Buyer Code",

  "/tlgu-slr/trnsctns": "View Order",
  "/tlgu-slr/trnsctns/id": "View Order",

  "/tlgu-slr/slssmry": "View Summary"
};
