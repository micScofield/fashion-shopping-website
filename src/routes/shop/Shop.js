import { useEffect, useState, useContext } from 'react'
// import { ProductContext } from 'contexts/pre-redux/product.context';
// import { CartContext } from 'contexts/cart.context';
import { InternetConnectionStatusContext } from 'contexts/internetConnectivity.context'
import { addItemToCart } from 'app/store/slices/cart.slice'
import { selectProducts, setProducts } from 'app/store/slices/product.slice'
import CardContainer from 'common/components/card-container/CardContainer'
import { overlayTextValues } from 'data/overlayTextValues'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { productApi, useGetProductsQuery } from 'app/store/services/product.api'
import DarkSpinner from 'common/components/spinner/dark/DarkSpinner'
import {
	selectAlertMsg,
	setAlert,
	selectAlertType,
	removeAlert,
} from 'app/store/slices/alert.slice'
import Alert from 'common/components/alert/Alert'
import { ALERT_TYPES, NO_INTERNET_MESSAGE } from 'common/constants'

function Shop() {
	// const { products } = useContext(ProductContext);
	// const { addItemToCart } = useContext(CartContext);
	const { isOnline } = useContext(InternetConnectionStatusContext)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { data: products, error, isLoading } = useGetProductsQuery()

	console.log({ products })

	if (error) console.log('Error', error)

	// Example of invalidating Product tag (ie. clear cache and make another API call) from a component
	/*
	useEffect(() => {
		dispatch(productApi.util.invalidateTags(['Product']))
	}, [])
	*/

	// other page which uses this data is category page where it makes a separate call anyways, so no need to store this as global state unless you need this anywhere else
	// useEffect(() => {
	// 	if (products) dispatch(setProducts(products))
	// }) // dispatch of actions should be inside an useEffect to make sure we are not hempering react state update cycle

	const [activeCard, setActiveCard] = useState(null)

	let productsCopy = products && JSON.parse(JSON.stringify(products))

	// select alerts to display to the user
	const alertMsg = useSelector(selectAlertMsg)
	const alertType = useSelector(selectAlertType)

	const onOverlayClickHandler = (e, payload) => {
		// If user added to cart, check current text ie. add to cart and click handler should add the item otherwise redirect to bag/checkout
		const {
			cardData: { id, imageUrl, name, price },
			currentText,
		} = payload
		setActiveCard(id)

		if (currentText === overlayTextValues.ADD_TO_CART) {
			dispatch(addItemToCart({ id, imageUrl, name, price }))
		} else {
			navigate('/checkout')
		}
	}

	useEffect(() => {
		if (!isOnline) {
			dispatch(
				setAlert({
					type: ALERT_TYPES.WARNING,
					msg: NO_INTERNET_MESSAGE,
				})
			)
		}
	}, [isOnline])

	const formattedProducts =
		productsCopy &&
		Object.keys(productsCopy).map((productCategory) => {
			let res = {}
			for (let i = 0; i < productsCopy[productCategory].length; i++) {
				productsCopy[productCategory][i]['footer'] = {
					value1: productsCopy[productCategory][i].name,
					value2: `$${productsCopy[productCategory][i].price}`,
				}
				if (productsCopy[productCategory][i].id !== activeCard) {
					productsCopy[productCategory][i]['overlay'] = [
						overlayTextValues.ADD_TO_CART,
					]
				} else {
					productsCopy[productCategory][i]['overlay'] = [
						overlayTextValues.GO_TO_BAG,
					]
				}
				productsCopy[productCategory][i]['onOverlayClick'] =
					onOverlayClickHandler
				productsCopy[productCategory][i]['overlayPosition'] = 'bottom'
				productsCopy[productCategory][i]['showOverlayByDefault'] = false
				productsCopy[productCategory][i]['disableImageTransition'] = true
			}
			res[productCategory] = productsCopy[productCategory]
			return res
		})

	const res =
		formattedProducts &&
		formattedProducts.reduce((acc, product) => {
			for (let i in product) acc[i] = product[i]
			return acc
		}, {})

	const onTitleClickHandler = (route) => navigate(`/shop/${route}`)

	const onAlertCloseHandler = () => {
		dispatch(removeAlert())
	}

	return !products || isLoading ? (
		<DarkSpinner />
	) : (
		<div>
			{alertMsg && (
				<Alert msg={alertMsg} type={alertType} onClose={onAlertCloseHandler} />
			)}
			{/* On the shop landing page, we want limited products to list, hence slicing the products array */}
			{res &&
				Object.keys(res).length !== 0 &&
				Object.keys(res).map((productCategory) => (
					<CardContainer
						key={productCategory}
						title={productCategory}
						titlePosition='left'
						onTitleClick={() => onTitleClickHandler(productCategory)}
						cards={res[productCategory].slice(0, 4)}
						grid={true}
						large={true}
					/>
				))}
		</div>
	)
}

export default Shop
