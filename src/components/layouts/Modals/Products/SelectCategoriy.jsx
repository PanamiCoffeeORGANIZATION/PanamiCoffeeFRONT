import './style.css';

export const SelectCategoriy = (props) => {

    const { categories, handleCategory, category: categorySelected, categoryLoader } = props;

    return (
        <div className="offcanvas offcanvas-start text-white" style={{ background: "#223147" }} data-bs-scroll="true" tabIndex="-1" id="offcanvasSelectCategory" aria-labelledby="offcanvasWithBothOptionsLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Categorías</h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <hr />
            <div className="offcanvas-body">
                <button data-bs-dismiss="offcanvas" className={`btn-categories ${ categorySelected === "TODO" && "active" }`} onClick={() => handleCategory("TODO")}>
                    {
                        categorySelected === "TODO" && categoryLoader ?
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            :
                            "TODO"
                    }
                </button>
                {
                    categories.map(category => (
                        <button
                            data-bs-dismiss="offcanvas"
                            onClick={() => handleCategory(category.id)}
                            className={`btn-categories ${ categorySelected === category.id && "active" }`}
                            key={category.id}
                        >
                            {
                                categorySelected === category.id && categoryLoader ?
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    :
                                    category.name
                            }
                        </button>
                    ))
                }
            </div>
        </div>
    )
}