const commonNavigation = [
  {
    section: "Vue d'ensemble",
    items: [
      { to: '/admin/dashboard', label: 'Tableau de bord', icon: 'bi-grid-1x2' },
      { to: '/admin/reports', label: 'Rapports BI', icon: 'bi-bar-chart-line' },
    ],
  },
  {
    section: 'Gestion du magasin',
    items: [
      { to: '/admin/products', label: 'Produits', icon: 'bi-box-seam' },
      { to: '/admin/stock', label: 'Stock & mouvements', icon: 'bi-arrow-left-right' },
      { to: '/admin/orders', label: 'Commandes', icon: 'bi-truck' },
      { to: '/admin/sales', label: 'Historique des ventes', icon: 'bi-receipt-cutoff' },
    ],
  },
  {
    section: 'Caisse & finances',
    items: [
      { to: '/admin/cash-register', label: 'Caisse & recettes', icon: 'bi-cash-stack' },
    ],
  },
];

export const adminNavigation = [
  ...commonNavigation,
  {
    section: 'Administration',
    items: [
      { to: '/admin/users', label: 'Utilisateurs', icon: 'bi-people' },
    ],
  },
];

/** Le gestionnaire gère le stock mais pas les comptes utilisateurs. */
export const managerNavigation = commonNavigation;

export const cashierNavigation = [
  {
    section: 'Caisse',
    items: [
      { to: '/cashier/pos', label: 'Encaissement', icon: 'bi-upc-scan' },
      { to: '/cashier/returns', label: 'Retours produits', icon: 'bi-arrow-return-left' },
    ],
  },
  {
    section: 'Activité',
    items: [
      { to: '/cashier/sales', label: 'Mes ventes', icon: 'bi-receipt-cutoff' },
      { to: '/cashier/products', label: 'Catalogue produits', icon: 'bi-box-seam' },
    ],
  },
];

export const getNavigation = (role) => {
  if (role === 'caissier') return cashierNavigation;
  if (role === 'gestionnaire') return managerNavigation;
  return adminNavigation;
};
