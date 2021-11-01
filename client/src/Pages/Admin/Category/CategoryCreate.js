import React, {useEffect, useState} from "react";
import AdminNav from "../../../Components/Nav/AdminNav";
import {Spin} from "antd";
import {
      createCategory,
      getCategories,
      removeCategory,
      updateCategory,
      getCategory
} from '../../../Functions/Categoy'
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {
      EditOutlined,
      DeleteOutlined
} from '@ant-design/icons';
import Modal from "../../../Components/Shared/Modal";

const CategoryCreate = () => {
      const [name, setName] = useState('')
      const [loading, setLoading] = useState(false)
      const [categories, setCategories] = useState([]);
      const [slug, setSlug] = useState('')
      const [showDeleteModal, setShowDeleteModal] = useState(false);
      const [showUpdateModal, setShowUpdateModal] = useState(false);
      const [updateName, setUpdateName] = useState('')

      const { user }  = useSelector(user => user);

      useEffect(() => {
            loadCategories()
      }, [])

      const onOpenDeleteHandler = (slug) => {
            setShowDeleteModal(true);
            setSlug(slug);
      };

      const onCancelDeleteHandler = () => {
            setShowDeleteModal(false);
            setSlug('');
      };

      const onOpenUpdateHandler = (slug) => {
            setShowUpdateModal(true);
            setSlug(slug);
            getCategory(slug)
                  .then(res => {
                        setUpdateName(res.data.name)
                  })
      };

      const onCancelUpdateHandler = () => {
            setShowUpdateModal(false);
            setSlug('');
      };

      const loadCategories = () => {
            setLoading(true);
            getCategories()
                  .then((res) => {
                        setLoading(false);
                        setCategories(res.data);
                  })
      };

      const onConfirmDeleteHandler = () => {
            removeCategory(slug, user.idToken)
                  .then(res => {
                        setShowDeleteModal(false);
                        toast.success(`${res.data.name} deleted Successfully`)
                        loadCategories();
                  })
                  .catch(err => {
                        toast.error( "deleted Failed")
                  })
      }

      const handleSubmit = (e) => {
            e.preventDefault();
            setLoading(true);
            createCategory({ name } , user.idToken)
                  .then(() => {
                        setLoading(false);
                        setName('')
                        toast.success(`${name} inserted Successfully`);
                        loadCategories();
                  })
                  .catch(err => {
                        console.log(err)
                        setLoading(false);
                        setName('')
                        toast.error(`${name} insert Failed`);
                  })
      }

      const updateSubmit = (e) => {
            e.preventDefault();
            setLoading(true);
            updateCategory(slug,{ updateName } , user.idToken)
                  .then(() => {
                        setLoading(false);
                        setUpdateName('')
                        toast.success(`${updateName} Update Successfully`);
                        setShowUpdateModal(false);
                        setSlug('');
                        loadCategories()
                  })
                  .catch(err => {
                        setLoading(false);
                        setUpdateName('')
                        toast.error(`${updateName} Updated Failed`);
                        setShowUpdateModal(false);
                        setSlug('');
                  })
      }

      const CategoryForm = () => (
            <form onSubmit={handleSubmit}>
                  <div className="form-group">
                        <h1 className="text-center font-weight-bold">Admin Category</h1>
                        <label><h3>Create New Category</h3></label>
                        <input
                              name=""
                              placeholder="Add New Category"
                              className="form-control"
                              type="text"
                              onChange={e => setName(e.target.value)}
                              autoFocus
                              value={name}
                              disabled={loading}
                        />
                  </div>
                  <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        disabled={!name || name.length < 2 || loading} > Submit
                  </button>
            </form>
      )

      return (
                <React.Fragment>
                      <Modal
                            show={showDeleteModal}
                            onCancel={onCancelDeleteHandler}
                            header="Are You Sure ?"
                            footerClass="place-item__modal-actions"
                            footer={
                                  <React.Fragment>
                                        <button className="btn btn-danger float-right mb-2 ml-2" onClick={onConfirmDeleteHandler}>Delete</button>
                                        <button className="btn btn-primary float-right mb-2 ml-2" onClick={onCancelDeleteHandler}>Cancel</button>
                                  </React.Fragment>
                            }>
                            <div>
                                  <p>Would You want to Delete ?</p>
                            </div>
                      </Modal>

                      <Modal
                            show={showUpdateModal}
                            onCancel={onCancelUpdateHandler}
                            header="Update Category"
                            footer={
                                  <React.Fragment>
                                        <button
                                              type="submit"
                                              className="btn btn-primary float-right ant-btn-lg"
                                              disabled={!updateName || updateName.length < 2 || loading}> Submit
                                        </button>
                                        <span
                                              className="btn btn-warning float-right ant-btn-lg mr-3"
                                              onClick={onCancelUpdateHandler}> Cancel
                                        </span>
                                  </React.Fragment>
                            }
                            children={
                                  <div>
                                        <div className="form-group">
                                              <input
                                                    name=""
                                                    placeholder="Add New Category"
                                                    className="form-control"
                                                    type="text"
                                                    onChange={e => setUpdateName(e.target.value)}
                                                    autoFocus
                                                    value={updateName}
                                                    disabled={loading}
                                              />
                                        </div>
                                  </div>
                            }
                            onSubmit={updateSubmit}
                            footerClass="mb-5"
                      >
                      </Modal>

                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-md-2">
                                <AdminNav/>
                          </div>
                          <div className="container p-5">
                            {loading ? <div className="text-center"> <Spin tip="Loading..." /> </div> :  CategoryForm()}
                            {categories.length > 0 ?
                              <div className="mt-3">
                                <table className="table table-striped table-dark">
                                  <thead className="text-center">
                                        <tr>
                                              <th>Category Name</th>
                                              <th>Action</th>
                                        </tr>
                                  </thead>
                                    {categories.map( c =>
                                      <tbody key={c._id}>
                                        <tr>
                                          <td className='text-center'>{c.name}</td>
                                          <td className='text-center'>
                                            <span
                                                  onClick={() => onOpenUpdateHandler(c.slug)}
                                                  className="btn btn-md">
                                                  <EditOutlined/>
                                            </span>
                                            <span
                                                  onClick={() => onOpenDeleteHandler(c.slug)}
                                                  className="btn btn-md">
                                                        <DeleteOutlined/>
                                            </span>
                                          </td>
                                        </tr>
                                      </tbody>
                                    )}
                                </table>
                              </div> :
                              <div className="text-center mt-5">
                                    <h1>No Category Found</h1>
                              </div>

                            }
                          </div>
                        </div>
                  </div>
                </React.Fragment>
            )
}

export default CategoryCreate;