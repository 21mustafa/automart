
function ItemImage (props) {
    return (
        props.img ? 
            <img className={props.class} src={"/parts/" + props.img} alt={props.type}/>
            : <img className={props.class} src={"car_placeholder.png"} alt={props.type}/>
    );
}

export default ItemImage;