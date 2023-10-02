/* eslint-disable prefer-template */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { getPeople } from '../api';
import { Loader } from './Loader';
import { Person } from '../types';
import { PersonLink } from './PersonLink';

export const People: React.FC = () => {
  const [people, setPeople] = useState<Person[]>();
  const [isClicked, setIsClicked] = useState<string | null>('');
  const [isError, setIsError] = useState<string | null>(null);

  getPeople().then((res) => {
    setPeople(res);
  }).catch((error) => {
    setIsError(error);
  });

  const names = people?.map((person) => person.name);

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">People Page</h1>

        <div className="block">
          <div className="box table-container">
            {(!people) && (<Loader />)}

            {(isError) && (
              <p data-cy="peopleLoadingError" className="has-text-danger">
                Something went wrong
              </p>
            )}

            {(people?.length === 0) && (
              <p data-cy="noPeopleMessage">
                There are no people on the server
              </p>
            )}

            {people && (
              <table
                data-cy="peopleTable"
                className="table is-striped is-hoverable is-narrow is-fullwidth"
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Sex</th>
                    <th>Born</th>
                    <th>Died</th>
                    <th>Mother</th>
                    <th>Father</th>
                  </tr>
                </thead>

                <tbody>
                  {people?.map((person) => {
                    const mother = people
                      .find(p => p.name === person.motherName);

                    const father = people
                      .find(p => p.name === person.fatherName);

                    return (
                      <tr
                        data-cy="person"
                        className={(isClicked === person.name)
                          ? 'has-background-warning' : ''}
                      >
                        <td>
                          {/* <a
                        href="#/people/jan-van-brussel-1714"
                        onClick={() => {
                          setIsClicked(person.name);
                        }}
                      >
                        {person.name}
                      </a> */}
                          <span onClick={() => {
                            setIsClicked(person.name);
                          }}
                          >
                            <PersonLink person={person} />
                          </span>
                        </td>

                        <td>{person.sex}</td>
                        <td>{person.born}</td>
                        <td>{person.died}</td>
                        <td>
                          {person.motherName
                          && names?.includes(person.motherName) && (
                            <a
                              href={`/people/${mother?.slug}`}
                              className="has-text-danger"
                              onClick={(e) => {
                                e.preventDefault();
                                setIsClicked(person?.motherName);
                              }}
                            >
                              {person.motherName}
                            </a>
                          )}
                          {person.motherName
                          && !names?.includes(person.motherName) && (
                            <>
                              {person.motherName}
                            </>
                          )}
                          {!person.motherName && (
                            <>
                              -
                            </>
                          )}

                        </td>
                        <td>
                          {person.fatherName
                          && names?.includes(person.fatherName) && (
                            <a
                              href={`/people/${father?.slug}`}
                              className=" "
                              onClick={(e) => {
                                e.preventDefault();
                                setIsClicked(person?.fatherName);
                              }}
                            >
                              {person.fatherName}
                            </a>
                          )}
                          {person.fatherName
                          && !names?.includes(person.fatherName) && (
                            <>
                              {person.fatherName}
                            </>
                          )}
                          {!person.fatherName && (
                            <>
                              -
                            </>
                          )}

                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
