export const calculateVendorScore = (vendor) => {
    const ratingScore = vendor.rating * 0.4;
    const popularityScore = vendor.totalBookings * 0.2;
  
    return ratingScore + popularityScore;
  };