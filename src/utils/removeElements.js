const removeElements = (elementsToRemove, elements) => {
    return elements.filter(
        (element) =>
            !elementsToRemove.some((elToRemove) => elToRemove.id === element.id)
    );
};

export default removeElements;
