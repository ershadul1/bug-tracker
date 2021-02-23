const capitalize = str => str.replace(/\w\S*/g, w => (w.replace(/^\w/, c => c.toUpperCase())));

export default capitalize;
