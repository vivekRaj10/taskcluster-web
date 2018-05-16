import { hot } from 'react-hot-loader';
import { Component } from 'react';
import { graphql } from 'react-apollo';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import provisionersQuery from './provisioners.graphql';
import Dashboard from '../../../components/Dashboard';
import ErrorPanel from '../../../components/ErrorPanel';
import Spinner from '../../../components/Spinner';
import ProvisionerDetailsCard from '../../../components/ProvisionerDetailsCard';

@hot(module)
@graphql(provisionersQuery)
@withStyles(theme => ({
  gridItem: {
    marginBottom: theme.spacing.double,
  },
}))
export default class ViewProvisioners extends Component {
  render() {
    const {
      user,
      onSignIn,
      onSignOut,
      classes,
      data: { loading, error, provisioners },
    } = this.props;

    return (
      <Dashboard
        title="Provisioners"
        user={user}
        onSignIn={onSignIn}
        onSignOut={onSignOut}>
        {loading && <Spinner loading />}
        {error &&
          error.graphQLErrors && (
            <ErrorPanel error={error.graphQLErrors[0].message} />
          )}
        {provisioners && (
          <Grid container spacing={24}>
            {provisioners.edges.map(({ node: provisioner }) => (
              <Grid
                key={`${provisioner.provisionerId}-item`}
                className={classes.gridItem}
                item
                xs={12}
                sm={6}
                md={4}>
                <ProvisionerDetailsCard dense provisioner={provisioner} />
              </Grid>
            ))}
          </Grid>
        )}
      </Dashboard>
    );
  }
}