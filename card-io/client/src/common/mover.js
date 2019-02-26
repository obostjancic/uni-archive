
const changePos = (elPos, oldPos, newPos) => {
    if (elPos === oldPos) {
        return newPos;
    } else if (elPos < Math.min(oldPos, newPos) || elPos > Math.max(oldPos, newPos)) {
        return elPos;
    } else if (oldPos < newPos) {
        return elPos - 1;
    }
    return elPos + 1;
};

const moveToPos = (coll, oldPos, newPos) => {
    const newColl = {};
    Object.entries(coll).map(([k, v]) => newColl[k] = { ...v, pos: changePos(v.pos, oldPos, newPos) });
    return newColl;
};

export default moveToPos;
