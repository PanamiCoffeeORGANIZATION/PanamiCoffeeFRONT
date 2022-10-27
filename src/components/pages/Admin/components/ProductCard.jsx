

export const ProductCard = (props) => {

    const { nombre, precio, descripcion, img, stock, categoria } = props;

    return (
        <>
            <div className="row">
                <div className="card mb-3 text-bg-secondary position-relative p-0 pe-2" style={{ maxWidth: "540px;" }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={img} style={{width:"100%",height:"100%",objectFit:"cover"}} className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{nombre}</h5>
                                <p className="card-text">{descripcion}</p>
                                <p className="card-text">$ {Number(precio).toLocaleString('en','US')}</p>
                                <p className="card-text bg-dark" style={{position: "absolute", top:"5px",right:"5px",borderRadius:"50px", padding:"5px", fontSize:"12px"}}>{stock}</p>
                                <p className="card-text" style={{position: "absolute", bottom:"5px",right:"5px", fontSize:"20px"}}>{categoria}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div></>
    )
}
