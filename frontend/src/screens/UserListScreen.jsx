/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { deleteUser, getUserList } from '../actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

export default function UserListScreen({ history }) {
    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userDelete = useSelector((state) => state.userDelete);
    const { success: successDelete } = userDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getUserList());
        } else {
            history.push('/login');
        }
    }, [dispatch, history, userInfo, successDelete]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure want to delete')) {
            dispatch(deleteUser(id));
        }
    };

    return (
        <div>
            <h1>Users</h1>

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th />
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? <p>Y</p> : <p>N</p>}</td>

                                <td>
                                    <LinkContainer to={`/admin/user/${user.id}`}>
                                        <Button variant="light" className="btn-sm">
                                            Edit
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant="danger"
                                        className="btn-sm"
                                        onClick={() => deleteHandler(user.id)}
                                    >
                                        Trash
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}
