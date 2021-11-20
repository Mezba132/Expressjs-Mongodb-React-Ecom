import axios from "axios";

export const createProduct = async (product, authtoken) =>
		await axios.post(`${process.env.REACT_APP_API}/product`, product,
			{
				headers : {
					authtoken,
				},
			})

export const getProductsByFilters = async (filters = {}) =>
		await axios.post(`${process.env.REACT_APP_API}/products/50`, {filters})

export const removeProduct = async (slug, authtoken) =>
		await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`,
				{
					headers : {
						authtoken,
					},
				})

export const getProduct = async (slug) =>
		await axios.get(`${process.env.REACT_APP_API}/product/${slug}`)

export const updateProduct= async (slug, product, authtoken) =>
		await axios.put(`${process.env.REACT_APP_API}/product/${slug}`, product,
				{
					headers : {
						authtoken,
					},
				})