import axios from "axios";

export const getCategories = async () =>
            await axios.get(`${process.env.REACT_APP_API}/categories`)

export const createCategory = async (category, authtoken) =>
             await axios.post(`${process.env.REACT_APP_API}/category`, category,
                  {
                        headers : {
                              authtoken,
                        },
                  })

export const getCategory = async (slug) =>
            await axios.get(`${process.env.REACT_APP_API}/categories/${slug}`)

export const updateCategory = async (slug, category, authtoken) =>
      await axios.put(`${process.env.REACT_APP_API}/categories/${slug}`,
            {
                  headers : {
                        authtoken,
                  },
            })

export const updateCategory = async (slug, authtoken) =>
      await axios.delete(`${process.env.REACT_APP_API}/categories/${slug}`,
            {
                  headers : {
                        authtoken,
                  },
            })