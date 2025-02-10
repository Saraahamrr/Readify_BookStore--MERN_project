const CartItem = ({ product, quantity, onRemove, onUpdateQuantity }) => {
    const { id, title, author, coverImage, price } = product;

    return (
        <div className="cart-item">
            <div className="product-info">
                <img className='bookImage' src={coverImage} alt={title} />
                <div className="details">
                    <p className="title">{title}</p>
                    <button className="remove-btn" onClick={() => onRemove(id)}>Remove</button>
                </div>
            </div>
            
            <div className="quantity">
                <button className="qty-btn" onClick={() => onUpdateQuantity(id, quantity - 1)} disabled={quantity <= 1}>-</button>
                <span>{quantity}</span>
                <button className="qty-btn" onClick={() => onUpdateQuantity(id, quantity + 1)}>+</button>
            </div>

            <p className="price">{price} EGP</p>
            <p className="total">{price * quantity} EGP</p>
        </div>
    );
};

export default CartItem;
