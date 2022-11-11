import './style.css';

export const SelectCategoriy = (props) => {

    const { categories, handleCategory, category: categorySelected, categoryLoader } = props;

    return (
        <div class="offcanvas offcanvas-start text-white" style={{ background: "#223147" }} data-bs-scroll="true" tabindex="-1" id="offcanvasSelectCategory" aria-labelledby="offcanvasWithBothOptionsLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Categorías</h5>
                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <hr />
            <div class="offcanvas-body">
                <button className={`btn-categories ${ categorySelected === "TODO" && "active" }`} onClick={() => handleCategory("TODO")}>
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