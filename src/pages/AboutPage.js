import React from 'react';

import HeaderPrimary from '../components/HeaderPrimary';

const AboutPage = () => {
  return (
    <div id='about-page'>
      <HeaderPrimary
        title='About EcoEateries'
        subtitle='Learn more about our initiative and scoring system.'
      />
      <div className='container'>
        <div className='columns '>
          <div className='column is-four-fifths'>
            <section className='section is-size-5'>
              <div className='mb-5'>
                If you’re a restaurant owner, there’s a lot to think about:
                menus, food sourcing, ambience, customer satisfaction, and
                increasingly, sustainability measures. Due to emerging
                legislation and a shift in customer values, restaurants
                increasingly have turned to local initiatives and online
                research to guide a transition in business practices.
              </div>
              <div className='mb-5'>
                Adopting sustainable practices is not only good for the
                environment and community, but also the restaurant and its
                employees. For instance, customers can taste a difference in
                locally sourced foods, and they feel better about supporting
                locations that leave a positive social impact. Additionally,
                restaurants can save money and attract attention from the
                surrounding community and media.
              </div>
              <div className='mb-5'>
                If you need a bit more convincing, check out{' '}
                <a href='https://bit.ly/32i845l'>this website</a>. They do a
                great job of breaking down the reasons to hop aboard and help
                your restaurant ✨turn over a new leaf✨Switching over to
                sustainable practices can feel like a daunting task, but it
                doesn’t have to be. We help you break down over-arching areas of
                improvement into achievable and focused goals and help you track
                and measure your progress. Our category areas and goals are
                adapted from the Green Restaurant Association standards.
              </div>
            </section>
            <hr />
            <section className='section is-size-5'>
              <h2 className='title is-3'>About our Scoring System</h2>
              <div className='mb-5'>
                <em>
                  {' '}
                  “The Green Restaurant Association’s (GRA) standards reflect 29
                  years of research in the field of restaurants and the
                  environment….The purpose of the GRA standards is to provide a
                  transparent way to measure each restaurant’s environmental
                  accomplishments while providing a pathway for the next steps
                  each restaurant can take towards increased environmental
                  sustainability.”
                </em>
              </div>
              <p>
                To learn more,{' '}
                <a href='https://www.dinegreen.com/certification-standards'>
                  check this out
                </a>{' '}
                .
              </p>
            </section>
            <hr />
            <section className='section is-size-5'>
              <h2 className='title is-3'>How to use EcoEateries:</h2>
              <div className='mb-5'>
                You can get started by registering and selecting some goals to
                work on; there are different points for each goal but you can
                get a total of 20 points in each category. If you’re a customer
                who’s curious about the participating restaurants and their
                progress, you can search a restaurant on the main page or view
                listed restaurants’ reports. If you’d like contact us with
                questions or to report an issue, you can find our developer
                contact information below.
              </div>
            </section>
            <hr />
            <section className='section is-size-5'>
              <h2 className='title is-3'>About Developers</h2>
              <div className='mb-5'>
                <p>
                  <b>Sneha Shivakumar:</b> Sneha is a fourth year Cybersecurity
                  major at Northeastern University.
                </p>
                <div className='my-2 m'>
                  <span className='mr-3'>
                    <a
                      target='_blank'
                      className='button is-primary is-light is-small'
                      href='https://www.linkedin.com/in/snehaskr/ '
                    >
                      LinkedIn
                    </a>
                  </span>
                  <span>
                    <a
                      className='button is-primary is-light is-small'
                      href='mailto:shivakumar.s@northeastern.edu'
                    >
                      Email
                    </a>
                  </span>
                </div>
              </div>

              <div className='mb-5'>
                <p>
                  <b>Dania Alnahdi:</b> Dania is a fourth year Computer Science
                  and Design major at Northeastern University.
                </p>
                <div className='my-2 m'>
                  <span className='mr-3'>
                    <a
                      target='_blank'
                      className='button is-primary is-light is-small'
                      href='https://www.linkedin.com/in/daniaalnahdi/ '
                    >
                      LinkedIn
                    </a>
                  </span>
                  <span>
                    <a
                      className='button is-primary is-light is-small'
                      href='mailto:alnahdi.d@northeastern.edu'
                    >
                      Email
                    </a>
                  </span>
                </div>
              </div>

              <div className='mb-5'>
                <p>
                  <b>Sadaf Khansalar:</b> Sadaf is a fourth year student
                  studying Computer Science and Music Technology at Northeastern
                  University.
                </p>
                <div className='my-2 m'>
                  <span className='mr-3'>
                    <a
                      target='_blank'
                      className='button is-primary is-light is-small'
                      href='https://www.linkedin.com/in/sadafkhansalar/ '
                    >
                      LinkedIn
                    </a>
                  </span>
                  <span>
                    <a
                      className='button is-primary is-light is-small'
                      href='mailto:khansalar.s@northeastern.edu'
                    >
                      Email
                    </a>
                  </span>
                </div>
              </div>

              <div className='mb-5'>
                <p>
                  <b>Raji Rajkumar: </b>Raji is a senior Computer Science
                  student at Scripps College.
                </p>
                <div className='my-2 m'>
                  <span className='mr-3'>
                    <a
                      target='_blank'
                      className='button is-primary is-light is-small'
                      href='https://www.linkedin.com/in/rajasri-rajkumar-58240a171/ '
                    >
                      LinkedIn
                    </a>
                  </span>
                  <span>
                    <a
                      className='button is-primary is-light is-small'
                      href='mailto:rrajkuma8843@scrippscollege.edu'
                    >
                      Email
                    </a>
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
