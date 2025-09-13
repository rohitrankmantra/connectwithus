import React from "react";
import bg from "../assets/images/associatebg.jpg";
import { Link } from "react-router-dom";
import background from "../assets/images/background.png";

const FccRules = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "50% 30%",
        }}
        className="relative py-32 z-20"
      >
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        <div className="relative z-20">
          {" "}
          {/* Added relative and z-20 */}
          <h1 className="text-4xl md:text-5xl  text-white text-center my-4">
            FCC Rules Governing Radio Stations
          </h1>
        </div>

        <div className="flex absolute bottom-1 translate-x-1/2 right-1/2 justify-end p-2 w-max mx-auto bg-black/10 text-2xl items-center z-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            class="text-white"
          >
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
          <Link to={"/"} className="text-white ml-1 text-lg md:text-xl">
            Home{" "}
          </Link>
          <h1 className="text-green-500 mx-2 text-lg md:text-xl">
            FCC Rules Governing Radio Stations
          </h1>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div
          style={{
            backgroundImage: `url(${background})`,
            backgroundPosition: `top left`,
          }}
          className=" py-10 md:py-20"
        >
          <h1 className="text-center text-2xl">
            TAPON RADIO BROADCAST STANDARDS AND TAPON APPLICANT REQUIREMENTS
          </h1>
        </div>
        <div>
          <h1 className="font-semibold">The Public and Broadcasting Manual </h1>
          <p className="font-thin">
            The Public and Broadcasting Manual (73.3526(e)(8), 73.3527(e)(7))
            (retain most recent version indefinitely). This pamphlet, written by
            the Commission, is intended to explain in understandable terms the
            various aspects and purposes of broadcast service, the Commission’s
            regulation of it, broadcasters’ obligations, and how the public can
            participate in the Commission’s licensing and other administrative
            processes involving their local broadcast stations.
          </p>
        </div>
        <h1 className="font-bold text-xl mt-5">
          BROADCAST PROGRAMMING: BASIC LAW AND POLICY
        </h1>

        <div
          className="text-sm font-thin space-y-1 md:my-8"
          style={{
            backgroundImage: `url(${background})`,
            backgroundPosition: `top right`,
          }}
        >
          <div>
            <p>
              The First Amendment and federal law generally prohibit us from
              censoring broadcast material and from interfering with freedom of
              expression in broadcasting. Individual radio and TV stations are
              responsible for selecting everything they broadcast and for
              determining how they can best serve their communities. Stations
              are responsible for choosing their entertainment programming, as
              well as their programs concerning local issues, news, public
              affairs, religion, sports events, and other subjects. They also
              decide how their programs (including call-in shows) will be
              conducted and whether to edit or reschedule material for
              broadcasting. We do not substitute our judgment for that of the
              station, and we do not advise stations on artistic standards,
              format, grammar, or the quality of their programming. This also
              applies to a stations commercials, with the exception of
              commercials for political candidates during an election (which we
              discuss later in this manual). Access to Station Facilities.
              Station’s are not required to broadcast everything that is offered
              or suggested to them. Except as required by the Communications Act
              and our rules concerning personal attacks, political editorials,
              and the use of stations by candidates for public office (which are
              discussed later in this manual), stations have no obligation to
              have any particular person participate in a broadcast or to
              present that person’s remarks. Further, no federal law or rule
              requires stations to broadcast & quot; public service
              announcements & quot; of any kind. Retention of Material
              Broadcast. We generally do not require stations to keep the
              material they broadcast. However, there are limited exceptions to
              this policy for personal attacks and political editorials.
              Personal Attacks. Personal attacks occur when, during the
              presentation of views on a controversial issue of public
              importance, someone attacks the honesty, character, integrity, or
              like personal qualities of an identified person or group. No more
              than a week after a personal attack, the station must transmit the
              following three things to the person or group attacked: (1)
              notification of the date, time, and identification of the
              broadcast; (2) a tape, script or accurate summary of the attack;
              and (3) an offer of a reasonable opportunity to respond on the
              air. Political Editorials. A political editorial is when a station
              endorses or opposes a legally qualified candidate(s) during a
              broadcast of its own opinion. (The opinions of other people 5
              broadcast over the station are referred to as & comments or
              commentary). Whether a statement of opinion is an editorial or a
              commentary will usually be made clear at the beginning of the
              statement. Within 24 hours after the editorial, the station must
              transmit the following three things to the other qualified
              candidate(s) for the same office, or to the candidate(s) that were
              opposed: (1) notification of the date and time of the editorial;
              (2) a script or tape of the editorial; and (3) an offer of a
              reasonable opportunity for the candidate or a spokesperson for the
              candidate to respond on the air. Station Identification. Stations
              must make identification announcements when they sign on and off
              for the day. They must also make the announcements hourly, as
              close to the hour as possible, at a natural programming break. TV
              stations may make these announcements on-screen or by voice only.
              Official station identification includes the station’s call
              letters followed by the community or communities specified in its
              license as the station’s location. Between the call letters and
              its community, the station may insert the name of the licensee,
              the station’s channel number, and/or its frequency.
            </p>
            <p className="mt-5 ">
              However, we do not allow any other insertion. BROADCAST
              PROGRAMMING: LAW AND POLICY ON SPECIFIC KINDS OF PROGRAMMING
              Broadcast Journalism. Under the First Amendment and the
              Communications Act, the FCC cannot tell stations how to select
              material for news programs, and we cannot prohibit the
              broadcasting of an opinion on any subject. We also do not review
              anyone’s qualifications to gather, edit, announce, or comment on
              the news; these decisions are the station’s responsibility.
              Political Broadcasting. Broadcasts by Candidates for Public
              Office. When a qualified candidate for public office has been
              permitted to use a station, the Communications Act requires the
              station to afford equal opportunities to all other such candidates
              for that office.”The Act also states that the station’s shall have
              no power of censorship over the material broadcast by the
              candidate. We do not consider either of the following two
              categories as a use that is covered by this rule: • An appearance
              by a legally qualified candidate on a bona fide newscast,
              interview or documentary (if the appearance of the candidate is
              incidental to the presentation of the subject covered by the
              documentary); or •on-the-spot coverage of a bona fide news event
              (including political conventions and related incidental
              activities). Political Editorials. Within 24 hours of airing an
              editorial where the station itself either supports or opposes a
              candidate for public office, it must transmit the following three
              things to the other qualified candidate(s) for the same office or
              to the candidate who was opposed in the editorial: (1)
              notification of the date and the time of the editorial; (2) a 6
              script or tape of the editorial; and (3) an offer of a reasonable
              opportunity for the candidate or a spokesperson for the candidate
              to respond on the air. Children’s Television Programming.
              Throughout its license term, every TV station must serve the
              educational and informational needs of children both through its
              overall programming, and through programming that is specifically
              designed to serve those needs. •Educational and Informational. We
              consider programming to be educational and informational if it in
              any respect furthers the educational and informational needs of
              children 16 years old and under (this includes their
              intellectual/cognitive or social/emotional needs). •Specifically
              Designed to Serve These Needs. A program is considered
              specifically designed to serve educational and information needs
              of children if: (1) that is its significant purpose; (2) it is
              aired between the hours of 7:00 a.m. and 10:00 p.m.; (3) it is a
              regularly scheduled weekly program; and (4) it is at least 30
              minutes in length. Commercial TV stations must identify programs
              specifically designed to educate and inform children at the
              beginning of the program, in a form left to their discretion, and
              must provide information identifying such programs to publishers
              of program guides. Additionally, in TV programs aimed at children
              12 and under, advertising may not exceed 10.5 minutes an hour on
              weekends and 12 minutes an hour on weekdays. Criticism, Ridicule,
              and Humor Concerning Individuals, Groups, and Institutions. The
              First Amendment’s guarantee of freedom of speech protects
              programming that stereotypes or otherwise offends people with
              regard to their religion, race, national background, gender, or
              other characteristics. It also protects broadcasts that criticize
              or ridicule established customs and institutions, including the
              government and its officials. If there is to be genuine free
              speech, people must be free to say things that the majority may
              abhor, not only things that the majority finds tolerable or
              congenial. “Clear and Present Danger”.
            </p>
            <p className="mt-5">
              The Constitution protects advocacy of using force or of violating
              the law. However,the Supreme Court has said that the government
              may curtail speech if it is both:(1) intended to incite or produce
              dangerous activity; and (2) likely to succeed inachieving that
              result. Even where this clear and present danger test is met, we
              believe that any review that might lead to a curtailment of speech
              should be performed by the appropriate criminal law enforcement
              authorities, and not by the FCC. Obscenity and Indecency. Federal
              law prohibits the broadcasting of obscene programming and
              regulates the broadcasting of indecent language. Obscene speech is
              not protected by the First Amendment and cannot be broadcast at
              any time. To be obscene, material must have all three of the
              following characteristics:
            </p>
            <ol className="list-decimal space-y-5 text font-thin ml-6 text-gray-700">
              <li>
                an average person, applying contemporary community standards,
                must find that the material, as a whole, appeals to the prurient
                interest; 7
              </li>
              <li>
                the material must depict or describe, in a patently offensive
                way, sexual conduct specifically defined by applicable law; and
              </li>
            </ol>

            <p>
              the material, taken as a whole, must lack serious literary,
              artistic, political, or scientific value. Indecent speech is
              protected by the First Amendment and cannot be outlawed. However,
              the courts have upheld Congress's prohibition of the broadcast of
              indecent speech during times of the day when there is a reasonable
              risk that children may be in the audience. Broadcasts that fall
              within the definition of indecency and that are aired between 6:00
              a.m. and 10:00 p.m. are subject to indecency enforcement action by
              the FCC. Indecent speech is defined as language or material that,
              in context, depicts or describes, in terms patently offensive as
              measured by contemporary community standards for the broadcast
              medium, sexual or excretory organs or activities." Profanity that
              does not fall under one of the above two categories is fully
              protected by the First Amendment and cannot be regulated. Violent
              Programming -- The V-Chip and TV Program Ratings. Some members of
              the public have expressed concern about violent television
              programming and the impact this programming has on children. In
              response to these concerns, Congress passed a law in 1996 to
              require TV sets with screens 13 inches or larger to be equipped
              with "v-chip technology - a device that allows parents to program
              their TV sets to block display of TV programming that carries a
              certain rating. This technology was developed together with a
              voluntary television rating system created by the television
              industry, which enables parents to identify programming which
              contains sexual, violent, or other indecent material they believe
              may be harmful to their children. The FCC has established rules
              requiring that by July 1, 1999, half of televisions with screens
              13 inches and larger have thev-chip, and that by January 1, 2000,
              all such televisions have the v-chip. Station- Conducted Contests.
              Stations that broadcast or advertise information about a contest
              that they conduct must fully and accurately disclose the material
              terms of the contest, and they must conduct the contest
              substantially as announced or advertised. Contest descriptions may
              not be false, misleading, or deceptive with respect to any
              material term. Material terms include the factors that define the
              operation of the contest and affect participation. Broadcast
              Hoaxes. Broadcasting false information concerning a crime or a
              catastrophe violates the FCC's rules if:
            </p>

            <ol className="list-decimal space-y-5 text font-thin ml-6 text-gray-700">
              <li>the station knew the information was false;</li>
              <li>
                broadcasting the false information directly caused substantial
                public harm; and
              </li>
            </ol>
            <p>
              it was foreseeable that broadcasting the false information would
              cause substantial public harm. In this context, a crime is an act
              or omission that makes the offender subject to criminal punishment
              by law, and a catastrophe" is a disaster or imminent disaster
              involving violent or sudden events affecting the public.Public
              harm must begin immediately; it must cause direct 8 and actual
              damage to property or to the health or safety of the general
              public, or diversion of law enforcement or other public health and
              safety authorities from their duties. Lotteries. Federal law
              prohibits broadcasting any advertisement for a lottery or any
              information concerning a lottery. A lottery is any game, contest,
              or promotion that contains the elements of prize, chance, and
              consideration (a legal term that means an act or promise that is
              made to induce someone into an agreement). There are a number of
              exceptions to this prohibition. Some of the exceptions are: (1)
              lotteries conducted by a state acting under the authority of state
              law, where the advertisement or information is broadcast by a
              radio or TV station licensed to a location in that state or in any
              other state that conducts such a lottery; (2) gaming conducted by
              an Indian Tribe under the Indian Gaming Regulatory Act; (3)
              lotteries authorized or not otherwise prohibited by the state in
              which they are conducted, and which are conducted by a
              not-for-profit organization or a governmental organization; and
              (4) lotteries conducted as a promotional activity by commercial
              organizations that are clearly occasional and ancillary to the
              primary business of that organization, as long as the lotteries
              are authorized or not otherwise prohibited by the state in which
              they are conducted. The prohibition regarding lottery advertising
              is currently under review by the Supreme Court. Soliciting Funds.
              No federal law prohibits broadcast requests for funds for legal
              purposes (including appeals by stations for contributions to meet
              their operating expenses) if the money or other valuable things
              contributed are used for the announced purposes. It is up to an
              individual station to decide whether to permit fund solicitations.
              Fraud by wire, radio or television is prohibited by federal law
              and may lead to FCC sanctions, as well as to criminal prosection
              by the U.S. Department of Justice. Broadcasting Telephone
              Conversations. Before recording a telephone conversation for
              broadcast, or broadcasting a telephone conversation live, a
              station must inform any party to the call of its intention to
              broadcast the conversation. However, this does not apply to
              conversations whose broadcast can reasonably be presumed (for
              example, telephone calls to programs where the station customarily
              broadcasts the calls).
            </p>
          </div>
          <input type="checkbox"></input>
          <h1>Read and agreed all the terms and conditions.</h1>
        </div>
      </div>
    </div>
  );
};

export default FccRules;
