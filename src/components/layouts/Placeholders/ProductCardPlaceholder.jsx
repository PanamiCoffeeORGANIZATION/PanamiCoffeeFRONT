import cuadroGris from '../../../assets/images/varios/gris.jpg'

export const ProductCardPlaceholder = () => {
    return (
        <div className="col-md-4 col-sm-6 mb-5">
            <div className="card card-producto position-relative">
                <img src={cuadroGris} className="card-img-top" alt="holder" />
                <div className="card-body text-white text-white">
                    <h5 className="card-title placeholder-glow">
                        <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                        <span className="placeholder col-7"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-6"></span>
                        <span className="placeholder col-8"></span>
                    </p>
                    <a href="#" tabIndex="-1" className="btn btn-purple disabled placeholder col-6"></a>
                </div>
            </div>
        </div>
    )
}
