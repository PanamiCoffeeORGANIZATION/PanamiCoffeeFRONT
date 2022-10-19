
export const filtroCategoria = ( arr, category ) => category === 0 ? arr : arr.filter( items => items.categoria === category );

