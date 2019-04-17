import React, { Fragment, Component } from 'react';
import './App.scss';
import { API_URL } from './config';
import Heroes from './components/gnomes/Heroes';
import { Switch, Route } from 'react-router-dom';
import GnomeAccount from './components/gnomes/GnomeAccount';
import Navigation from './components/navigation/Navigation';
import Backdrop from './components/navigation/Backdrop';
import styled from 'styled-components';
import { CornerLeftUp as BackButtonIcon } from 'react-feather';
import Statistics from './components/statistics/Statistics';
import Favourites from './components/Favourites';
import { mapValues } from './objects';
import ErrorPage from './ErrorPage';
import Spinner from './Spinner';

const StatisticBox = styled.div``;

const MOBILE_BREAKPOINT = 800;
const MOBILE_BREAKPOINT_S = 426;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      navigationOpen: false,
      newItem: '',
      list: []
    };
  }

  parsedFavouritesIds = list => mapValues(({ id }) => id)(list);

  hydrateStateWithLocalStorage = () => {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);

        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  };

  saveStateToLocalStorage = () => {
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]));
    }
  };

  updateInput = (key, value) => {
    this.setState({ [key]: value });
  };

  addItem = id => {
    const { list: existingList } = this.state;
    const existingFavourites = this.parsedFavouritesIds(existingList);

    if (existingFavourites.includes(id)) {
      return;
    }

    const newItem = {
      id,
      value: id
    };
    const list = [...existingList, newItem];

    this.setState({
      list,
      newItem: ''
    });
  };

  deleteItem = id => {
    const list = [...this.state.list];
    const updatedList = list.filter(item => item.id !== id);

    this.setState({ list: updatedList });
  };

  handleNavigation = () => {
    this.setState(prevState => ({
      navigationOpen: !prevState.navigationOpen
    }));
  };

  onResize = () => {
    if (window.innerWidth > MOBILE_BREAKPOINT) {
      this.setState({ navigationOpen: true });
    } else if (window.innerWidth < MOBILE_BREAKPOINT_S) {
      this.setState({ mobileView: true });
    } else {
      this.setState({ mobileView: false });
    }
  };

  componentDidMount() {
    if (!localStorage.data) {
      fetch(API_URL)
        .then(response => response.json())
        .then(data => {
          this.setState({ data: Object.values(data.Brastlewark) });
        });
    }

    this.hydrateStateWithLocalStorage();

    if (window.innerWidth > MOBILE_BREAKPOINT) {
      this.setState({ navigationOpen: true });
    }

    window.addEventListener('resize', this.onResize);

    this.onResize();

    window.addEventListener(
      'beforeunload',
      this.saveStateToLocalStorage.bind(this)
    );
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);

    window.removeEventListener(
      'beforeunload',
      this.saveStateToLocalStorage.bind(this)
    );

    this.saveStateToLocalStorage();
  }

  filterGnome = favourites => data =>
    favourites.map(favouriteId =>
      data.find(gnome => {
        if (gnome.id === favouriteId.id) {
          return gnome;
        }
      })
    );

  renderHome = (data = {}, mobileView, existingFavourites) =>
    data ? (
      <Heroes
        mobileView={mobileView}
        onToggleNavigation={this.handleNavigation}
        data={data}
        removeFavourite={id => this.deleteItem(id)}
        favouritesClick={id => this.addItem(id)}
        list={existingFavourites}
      />
    ) : (
      <Spinner>Loading...</Spinner>
    );

  renderFavourites = (list = [], data = {}, existingFavourites, mobileView) => {
    const filteredGnomes = this.filterGnome(list)(data);

    return data ? (
      <Favourites
        onToggleNavigation={this.handleNavigation}
        data={filteredGnomes}
        removeFavourite={id => this.deleteItem(id)}
        list={existingFavourites}
        mobileView={mobileView}
      />
    ) : (
      <Spinner>Loading...</Spinner>
    );
  };

  renderStatistics = (data = {}, mobileView) => (
    <div>
      {data ? (
        <StatisticBox>
          <Statistics
            mobileView={mobileView}
            onToggleNavigation={this.handleNavigation}
            data={data}
          />
        </StatisticBox>
      ) : (
        <Spinner>Loading...</Spinner>
      )}
    </div>
  );

  renderGnomeAccount = (data, props, mobileView, existingFavourites) => {
    const { id: paramId } = props.match.params;

    return (
      <Fragment>
        <div className="button-box">
          <button onClick={() => window.history.back()} className="row-margin">
            <div>
              <BackButtonIcon />
            </div>
            <div>Back</div>
          </button>
        </div>
        {data ? (
          <GnomeAccount
            onToggleNavigation={this.handleNavigation}
            key={paramId}
            data={data}
            removeFavourite={id => this.deleteItem(id)}
            favouritesClick={id => this.addItem(id)}
            mobileView={mobileView}
            list={existingFavourites}
            {...props}
          />
        ) : (
          <Spinner>Loading...</Spinner>
        )}
      </Fragment>
    );
  };

  render() {
    const { navigationOpen, mobileView, list, data } = this.state;
    const existingFavourites = this.parsedFavouritesIds(list);

    return (
      <div className="main">
        {navigationOpen && (
          <Fragment>
            <Navigation
              onClose={this.handleNavigation}
              mobileView={mobileView}
            />
            <Backdrop clicked={this.handleNavigation} />
          </Fragment>
        )}
        <main>
          <div className="main-box">
            <div className="main-box-inner">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={() =>
                    this.renderHome(data, mobileView, existingFavourites)
                  }
                />
                <Route
                  path="/gnome/:id"
                  component={props =>
                    this.renderGnomeAccount(
                      data,
                      props,
                      mobileView,
                      existingFavourites
                    )
                  }
                />
                <Route
                  path="/statistics"
                  component={() => this.renderStatistics(data, mobileView)}
                />
                <Route
                  path="/favourites"
                  component={() =>
                    this.renderFavourites(
                      list,
                      data,
                      existingFavourites,
                      mobileView
                    )
                  }
                />
                <Route component={ErrorPage} />
              </Switch>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
