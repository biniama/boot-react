import * as React from 'react';
import './App.css';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class GroupList extends React.Component<{}, any> {

    constructor(props: any) {

        super(props);

        this.state = {
            groups: [],
            isLoading: false
        };

        this.remove = this.remove.bind(this);
    }

    public componentDidMount() {
        this.setState({isLoading: true});

        fetch("/api/groups")
            .then(response => response.json())
            .then(data => this.setState({groups: data, isLoading: false}));
    }

    public remove(id: any) {

        fetch("/api/group/${id}", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        }).then(() => {
            const updatedGroups = [...this.state.groups].filter(i => i.id !=== id);
            this.setState({ groups: updatedGroups });
        })
    }

    public render() {

        const {groups, isLoading} = this.state;

        if (isLoading) {
            return <div>Loading ...</div>
        }

        const groupList = groups.map((group: any) => {
            const address = `${group.address || ''} ${group.city || ''} ${group.stateOrProvince || ''}`;

            return
                <tr key={group.id}>
                    <td style={{ whiteSpace: 'nowrap' }}>{group.name}</td>
                    <td>{address}</td>
                    <td>{group.events.map((event: any) => {
                        return <div key={event.id}>{new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(event.date))}: {event.title}
                        </div>
                    })}</td>
                    <td>
                        <ButtonGroup>
                            <Button size="sm" color="primary" tag={Link} to={"/groups" + group.id}>Edit</Button>
                            <Button size="sm" color="danger" onClick={() => this.remove(group.id)}>Delete</Button>
                        </ButtonGroup>
                    </td>
                </tr>
            }
        );

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/groups/new">Add Group</Button>
                    </div>
                    <h3>JUG Tour</h3>
                    <Table className="mt-4">
                        <thead>
                            <tr>
                                <th width="20%">Name</th>
                                <th width="20%">Location</th>
                                <th>Events</th>
                                <th width="10%">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groupList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default GroupList;
