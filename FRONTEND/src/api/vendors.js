import vendors from '../data/vendors.json';

export function getAllVendors() {
  return vendors;
}

export function getVendorById(id) {
  return vendors.find(v => v.id === id);
}
