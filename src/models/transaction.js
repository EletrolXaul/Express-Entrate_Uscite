// Costanti per i tipi di transazione/categorie
export const TRANSACTION_TYPES = {
  STIPENDIO: 'stipendio',
  AFFITTO: 'affitto',
  SPESA: 'spesa',
  BOLLETTE: 'bollette',
  EXTRA: 'extra',
  SVAGO: 'svago',
  ALTRO: 'altro'
};

// Funzioni di utilità per le transazioni
export function getCategoryColor(type) {
  const colors = {
    stipendio: '#28a745',
    affitto: '#dc3545',
    spesa: '#fd7e14',
    bollette: '#6f42c1',
    extra: '#ffc107',
    svago: '#17a2b8',
    altro: '#6c757d'
  };
  
  return colors[type?.toLowerCase()] || colors.altro;
}