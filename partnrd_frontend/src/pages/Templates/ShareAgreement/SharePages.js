import React from "react";
import { ToWords } from "to-words";
import AlertDialog from "./Info";

export const Beginning = function ({
  corpName,
  corpDate,
  corpPlace,
  personData,
}) {
  return (
    <div>
      <div>
        THIS AGREEMENT (the “Agreement”), is made as of {corpDate}, between{" "}
        {corpName}, a corporation incorporated under the laws of {corpPlace}{" "}
        (the “Corporation”);
        {personData.map((x) => {
          return `
                    ${x.name.fname},
                    an individual residing in the City of
                    ${x.address[2]},
                    ${
                      !x.name.prefName
                        ? `${x.address[1]};`
                        : `${x.address[1]} ("${x.name.prefName}");`
                    } `;
        })}
        each investor being listed on Schedule “A” annexed hereto, and any
        person who becomes a party hereto by executing an acknowledgement in the
        form annexed hereto as Schedule “B”.
      </div>
    </div>
  );
};

export const Recitals = function () {
  return (
    <div>
      <AlertDialog
        title="Recitals"
        info={
          <div>
            <p>
              The recitals (or “whereas clauses”) are a formality that makes the
              agreement appear more professional while clarifying legal
              intentions.
            </p>
          </div>
        }
      />
      <p>
        {"\t"}WHEREAS the Parties to this Agreement, other than the Corporation,
        together own, directly or indirectly, all of the issued and outstanding
        shares in the capital of the Corporation as of the date of this
        Agreement; AND WHEREAS the Parties to this Agreement wish to record
        their agreement as to the manner in which the Corporation’s affairs are
        to be conducted and to agree upon the terms on which the securities of
        the Corporation, now or hereafter outstanding and held by them, will be
        held, transferred and voted; NOW THEREFORE THIS AGREEMENT WITNESSES,
        that in consideration of the premises and mutual covenants and
        agreements contained in this Agreement, the parties covenant and agree
        as follows:
      </p>
    </div>
  );
};

export const Articles = function ({
  corpPlace,
  founderData,
  shareData,
  majControl,
}) {
  const corpAct =
    corpPlace === "Canada"
      ? `CBCA ("Canada Business Corporations Act")`
      : "OBCA (Business Corporations Act of Ontario)";
  const shareTypes = [];
  shareData.map((x, i) => {
    return (shareTypes[
      i
    ] = `"${x.shareName}" means the ${x.shareClass} ${x.shareType} 
          in the capital of the corporation`);
  });

  const founder =
    founderData.length > 0
      ? founderData.length > 1
        ? "Founders means " +
          `${founderData.map((x, i) => {
            return `${
              i === founderData.length - 1
                ? ` and ${x.name.fname}`
                : `${x.name.fname}`
            }`;
          })}` +
          ' \n and "Founder" shall mean any one of them'
        : `\n Founder means ${founderData[0].name.fname}`
      : " ";

  const control = `“Control” means: (a) with respect to any corporation, 
    the ownership, beneficially and legally of voting securities in the 
    capital of such corporation, to which are attached more than
    ${strigifyNums(
      majControl
    )} (${majControl}%)of the votes that may be cast to elect
    the directors of such corporation and such votes are sufficient(if exercised)
    to elect a majority of the directors; and(b) with respect to a partnership, trust,
    syndicate, or other entity, actual power or authority to manage and direct the
    affairs of, or ownership of more than ${strigifyNums(majControl)}
    (${majControl}%) of the beneficial interest of such entity.`;

  return (
    <div>
      <AlertDialog
        title="ARTICLE 1: DEFINITION"
        info={
          <div>
            <p>
              This article provides definitions that are legally binding to help
              settle ambiguities in understanding the agreement.
            </p>
            <p>
              Outlining the exact definitions is not only good practice for
              telling shareholders what to expect, but can be important if
              disputes arise. The following are commonly used but legally
              significant terms that are clarified to prevent ambiguity.
            </p>
          </div>
        }
      />
      <p>
        Whenever and wherever used in this Agreement, the following words and
        terms shall have the following meanings as set out below:
      </p>
      <ol>
        <li>
          “Act” means the {corpAct} as the same may be amended from time to
          time;
        </li>
        <li>“Affiliate” of a Person means another Person where:</li>
        <ol>
          <li>One of them is a Subsidiary of the other, or</li>
          <li>Each of them is controlled by the same Person.</li>
        </ol>
        <li>
          “Agreement” means this Shareholder’s Agreement and all attached
          schedules and all instruments supplemental to or in amendment or
          confirmation of this Agreement;
        </li>
        <li>
          “arm’s length” has the meaning that is has for the purposes of the
          Income Tax Act (Canada);{" "}
        </li>
        <li>
          “Articles” means the articles of incorporation of the Corporation, as
          amended from time to time;
        </li>
        <li>
          “Board” means the board of directors of the Corporation, as
          constituted from time to time in accordance with this Agreement;
        </li>
        <li>
          “Business Day” means any day of the week except Saturday, Sunday, or
          any statutory holiday in the Province of Ontario;
        </li>
        {shareTypes.map((x, i) => {
          return <li key={i}>{x}</li>;
        })}
        <li>
          “Competitor” means any business which is, at the relevant time,
          engaged in the creation, design, development, marketing, sale,
          licensing, or other business activity of any products or services that
          are in form and functionality competitive with any of the products or
          services that are marketed and sold or licensed by the Corporation or
          any product or service that is known by a Shareholder to be under
          development by the Corporation;
        </li>
        <li>{control}</li>
        <li>
          “Family Members” means any parent, spouse, child, spouse of a child,
          grandchild, or sibling of an individual;
        </li>
        <li>{founder}</li>
        <li>“Founder Shares” means the Common Shares held by the Founders;</li>
        <li>
          “Initial Public Offering” or “IPO” shall mean the Corporation’s first
          underwritten public offering of its Common Shares on any stock
          exchange or market approved in writing by a Preferred Majority;
        </li>
        <li>
          “Investor” means each Person listed in Schedule A of this Agreement
          under the heading “Investors”, so long as such Person holds Class A
          Preferred Shares, together with any other Person that becomes a Party
          to this Agreement as a holder of Class A Preferred Shares (including
          Permitted Transferees of Class A Preferred Shares); and “Investor”
          means all of such Persons collectively;
        </li>
      </ol>
      <h6>1.2 Additional Definitions</h6>
      <p>
        Unless there is an inconsistency in the subject matter or context, or
        unless otherwise provided for in this Agreement, all other words and
        terms used herein that are defined in the Act have the meanings set out
        in that Act.{" "}
      </p>
      <h6>1.1 Rules of Interpretation</h6>
      <p>
        As used in this Agreement, the following rules shall apply to the use of
        the following terms:
      </p>
      <ol>
        <li>
          Consent. Where a provision of this Agreement requires an approval or
          consent and such approval or consent is not delivered within the
          applicable time limit, then unless otherwise specified, the Party
          whose consent or approval is required is conclusively deemed to have
          withheld its approval or consent.
        </li>
        <li>
          Including. Where the word “including” or the word “includes” is used
          in this Agreement, it means “including (or includes) without
          limitation”
        </li>
        <li>
          Number and Gender. Unless the context otherwise necessitates, words
          using the singular include the plural and vice versa, and words
          importing gender shall include all genders.
        </li>
        <li>
          Severability. In the event that one or several of the provisions of
          this Agreement are found to be invalid, illegal, or unenforceable in
          any respect in accordance with any laws or regulations which have
          jurisdiction over said Agreement, the validity, legality, and or
          enforceability of the remaining provisions of this Agreement shall not
          be affected or compromised in any respect. The Parties shall strive in
          good faith to replace such invalid, illegal, or unenforceable
          provisions with effective provisions that accomplish to the greatest
          extent permitted by law and the intentions of the Parties, and the
          economic effect of such effective provisions shall be as close as
          possible to the economic effect of those invalid, illegal, or
          unenforceable provisions.
        </li>
        <li>
          Time Periods. Unless otherwise specified, time periods within or
          following which any payment is to be made or act is to be done will be
          calculated by excluding the day on which the period commences and
          including the day on which the period ends and by extending the period
          to the following Business Day if the last day of the period is not a
          Business Day.
        </li>
        <li>
          Currency. Unless otherwise indicated, all dollar amounts in this
          Agreement shall refer to lawful money of Canada.
        </li>
      </ol>
    </div>
  );
};

export const Article2 = function () {
  return (
    <div>
      <AlertDialog
        title="ARTICLE 2: PURPOSE AND SCOPE"
        info={
          <div>
            <p>
              This section ensures that this agreement binds all the
              shareholders to the same terms and what matters require voting and
              approval.
            </p>
            <p>
              The unanimous agreement is generally the simpler and more
              cost-effective way to make a shareholder agreement binding.
              Another option is to only allow major investors and
              founders/directors of the corporation to enter into an agreement
              while minority investors must contract separately. Please see a
              lawyer if you would like to do this (this option is discouraged
              for early stage start-ups).
            </p>
          </div>
        }
      />

      <h6>2.1 Complinance with Agreement</h6>
      <p>
        The Shareholders shall at all times do all acts and things and vote the
        Issued Shares and otherwise exercise their respective rights as
        shareholders to cause such meetings to be held, resolutions to be
        passed, by-laws to be enacted, documents to be executed and, to the
        extent permitted by Applicable Law, to cause their respective nominees
        on the Board to act, so that at all times the provisions, conditions,
        restrictions and prohibitions contained in this Agreement relating to
        their respective shareholdings in the capital of the Corporation and the
        business and corporate affairs of the Corporation shall fully apply,
        including, without limitation, the amendment or repeal of the Articles,
        by-laws and/or resolutions of the Corporation to the extent necessary to
        resolve any conflict between same and this Agreement so that this
        Agreement shall at all times prevail.{" "}
      </p>
      <h6>2.2 Corporation shall comply </h6>
      <p>
        The Corporation itself undertakes to carry out and become bound by the
        provisions of this Agreement to the fullest extent possible.{" "}
      </p>
      <h6>2.3 Agreement to Vote Shares</h6>
      <p>
        In the event that any action requiring approval pursuant to Section X.X
        of this Agreement is approved by the Board and the required number of
        Investors (a “Special Action”), each Shareholder agrees that it shall
        fully execute and deliver all necessary instruments including without
        limitation deeds, transfers, consents, resolutions, share-certificates,
        or otherwise, that are necessary to complete the Special Action at any
        meeting of shareholders of the Corporation, or shall fully execute all
        written shareholder consents and resolutions relating to the Special
        Action and the completion of the transaction contemplated thereunder.
        Further, each Shareholder hereby expressly waives any right to dissent
        with respect to any such actions which are required for the purpose of
        any Special Action. However, this Section 2.3 shall only apply if all
        Shares of a particular class are treated in a similar manner.
      </p>
      <h6>2.4 Unanimous Shareholder Agreement</h6>
      <p>
        This Agreement shall be deemed to be a unanimous shareholder agreement
        within the meaning of the Act, and the power of directors to manage or
        oversee the management of the business and affairs of the Corporation is
        restricted according to this Agreement. Furthermore, no amendment to
        this Agreement which affects the rights, powers, and duties of any
        directors is valid or effective until such time that the directors are
        given written notice of the proposed amendment and the opportunity to
        resign.
      </p>
      <AlertDialog
        title="ARTICLE 3: FINANCIAL PARTICIPATION IN THE CORPORATION"
        info={
          <div>
            <p>
              This article lays out the expectations placed on anyone who
              purchases shares in your corporation.
            </p>
            <p>
              These terms are expanded on later, especially when it comes to
              selling shares and voting.
            </p>
          </div>
        }
      />
      <h6>3.1 Equity</h6>
      <p>
        Each of the Shareholders represents and warrants to each other and to
        the Corporation that:
      </p>
      <ol>
        <li>
          such Shareholder at the date of this Agreement (or if such Shareholder
          becomes a Party to this Agreement after the date of this Agreement,
          then at the time they acquire their Shares), beneficially owns, and
          the same is recorded, the number of Shares set out beside the
          Shareholder’s name on Schedule “A” attached hereto, as applicable (as
          such schedules may be amended from time to time to reflect changes in
          shareholdings);
        </li>
        <li>
          the Shares held by such Shareholder are held beneficially and are
          recorded by such Shareholder, such shares are not subject to any
          mortgage, lien, charge, pledge, encumbrance, security interest, or
          adverse claim, and no Person has any rights to become a holder or
          possessor of any of the Shares or of the certificates representing the
          same, if applicable;
        </li>
        <li>
          if the Shareholder is an individual, then such Shareholder has the
          legal capacity to enter into and execute the terms fully, of this
          Agreement;
        </li>
        <li>
          if the Shareholder is a corporation, that it is duly incorporated and
          validly existing under the laws of its jurisdiction of incorporation
          and that it has the corporate power and capacity to own its assets and
          to enter into and perform its obligations under this Agreement;
        </li>
        <li>
          in the case that the Shareholder is a trust, partnership, or joint
          venture, that it is duly constituted under the laws of the
          jurisdiction that governs it and that it has the power and authority
          to own its own assets and to contract into this Agreement;
        </li>
        <li>
          this Agreement has been duly authorized by the Shareholder and duly
          executed and delivered by such Shareholder and that this Agreement is
          binding upon the Shareholder in accordance with the terms herein,
          except for usual exceptions as to bankruptcy and the availability of
          equitable remedies;
        </li>
        <li>
          the execution, delivery and performance of this Agreement does not and
          never will contravene the provisions of its articles, by-laws,
          constating documents or other organizational documents of the
          Corporation or documents to which the Shareholder was created or
          established or the provisions of any agreement to which such
          Shareholder is a party or may be bound to; and,
        </li>
        <li>
          all of the foregoing representations and warranties (excepting those
          in paragraph 1.) shall continue to be true and correct during the
          length of this Agreement.
        </li>
      </ol>
    </div>
  );
};
function getClass(shareData, shareID, numHeld) {
  let c = "";
  for (let i = 0; i < shareData.length; i++) {
    if (shareID === shareData[i].shareID && numHeld > 0) {
      c = shareData[i].shareClass;
      return c;
    }
  }
  return c;
}

function strigifyNums(num) {
  const toWords = new ToWords();
  let words = toWords.convert(num).toLowerCase();
  return words;
}

function getNames(list, directorData) {
  const l = [];

  directorData.forEach((x, i) => {
    list.forEach((n) => {
      if (x.ID === n) {
        l.push(directorData[i].name);
      }
    })
  });
  return l;
}

export const Article4 = function ({ directorData, shareData, optOut }) {
  const prefShares = [];

  const toWords = new ToWords();
  let numDirectors = toWords.convert(directorData.length).toLowerCase();
  const directWords = directorData.length > 1 ? "directors" : "director";
  const directors = {
    founder: {
      number: 0,
      names: "",
      nominee: "Founder ",
    },
    preferred: {
      number: 0,
      name: "",
      nominee: "Investor ",
      classA: {
        number: 0,
        names: "",
        personID: [],
        nominee: "Class A Investor ",
      },

      classB: {
        number: 0,
        names: "",
        personID: [],
        nominee: "Class B Investor ",
      },
    },
    common: {
      number: 0,
      names: "",
      nominee: "Common ",
    },
  };

  shareData.forEach((x) => {
    if (x.shareType === "Preferred") {
      prefShares.push({
        id: x.shareID,
        name: x.shareName,
        class: x.shareClass,
      });
    }
  });

  directorData.forEach((x, i) => {
    if (x.nominee === "Founder") {
      directors.founder.number += 1;
      directors.founder.names += ` ${x.name},`;
    } else if (x.nominee === "Preferred") {
      directors.preferred.number += 1;
      directors.preferred.name = x.name;

      directorData[i].shareinfo.forEach((n) => {
        const c = getClass(shareData, n.shareID, n.numHeld);
        if (c === "Class A") {
          directors.preferred.classA.personID.push(x.ID);
        }
        if (c === "Class B") {
          directors.preferred.classB.personID.push(x.ID);
        }
      });
    } else if (x.nominee === "Common") {
      directors.common.number += 1;
      directors.common.names += ` ${x.name},`;
    }
  });

  const classIDs = directors.preferred.classA.personID;
  const classA = classIDs.filter((val, id) => {
    return classIDs.indexOf(val) === id;
  });

  const classBIDs = directors.preferred.classB.personID;
  const classB = classBIDs.filter((val, id) => {
    return classBIDs.indexOf(val) === id;
  });

  directors.preferred.classA.names =
    getNames(classA, directorData).length === 1
      ? getNames(classA, directorData).join(" ")
      : getNames(classA, directorData).join(", ");;
  directors.preferred.classB.names =
    getNames(classB, directorData).length === 1
      ? getNames(classB, directorData).join(" ")
      : getNames(classB, directorData).join(", ");
  
  directors.preferred.classA.number = classA.length;
  directors.preferred.classB.number = classB.length;

  const paragraphPref =
    `Any amendment to the Articles or by-laws of the Corporation that would adversely affect the rights, 
      preferences, privileges, or powers of` +
    `
    ${
      prefShares.length > 0
        ? `${
            prefShares.length > 1
              ? `${prefShares.map((x, i) => {
                  return `${
                    i === prefShares.length - 1 ? ` and ${x.name}` : `${x.name}`
                  }`;
                })}`
              : `${prefShares[0].name}`
          }`
        : "None"
    }`;
  return (
    <div>
      <AlertDialog
        title="ARTICLE 4: STRUCTURE OF THE CORPORATION"
        info={
          <div>
            <p>
              This article lays out the specifics of decision-making including
              who can vote, what matters require approval, and related
              procedures.
            </p>
            <p>
              Though at early stages the founders can simply appoint people into
              roles by naming them, having the foundations in place for the
              process of electing directors can be helpful in cases like the
              departure/removal of founders, new class creation, etc.
            </p>
          </div>
        }
      />
      {!optOut && (
        <div>
          <h6>4.1 Board of Directors</h6>
          <p>
            The Corporation shall have a Board of Directors consisting of up to{" "}
            {numDirectors} {directWords}, of which:
          </p>
          <ol type="a">
            {directors.founder.number > 0 && (
              <li>
                {strigifyNums(directors.founder.number)} director(s) shall be
                nominated by the Founders (the “{directors.founder.nominee}
                Nominee”) who shall initially be {directors.founder.names}
              </li>
            )}
            {directors.preferred.number === 1 && (
              <li>
                {strigifyNums(directors.preferred.number)} director(s) shall be
                nominated by the Founders (the “{directors.preferred.nominee}
                Nominee”) who shall initially be {directors.preferred.name}
              </li>
            )}
            {directors.preferred.number > 1 &&
              directors.preferred.classA.number > 0 && (
                <li>
                  {strigifyNums(directors.preferred.classA.number)} director(s)
                  shall be nominated by the Founders (the “
                  {directors.preferred.classA.nominee}
                  Nominee”) who shall initially be{" "}
                  {directors.preferred.classA.names}
                </li>
              )}
            {directors.preferred.number > 1 &&
              directors.preferred.classB.number > 0 && (
                <li>
                  {strigifyNums(directors.preferred.classB.number)} director(s)
                  shall be nominated by the Founders (the “
                  {directors.preferred.classB.nominee}
                  Nominee”) who shall initially be{" "}
                  {directors.preferred.classB.names}
                </li>
              )}
            {directors.common.number > 0 && (
              <li>
                {strigifyNums(directors.common.number)} director(s) shall be
                nominated by the Founders (the “{directors.common.nominee}
                Nominee”) who shall initially be {directors.common.names}
              </li>
            )}
          </ol>
          <p>
            Each Shareholder shall vote its Shares at any meeting where
            directors are being elected, or execute any written resolutions of
            the shareholders at the request of the Corporation, to elect the
            directors nominated in accordance with this Agreement.
          </p>
        </div>
      )}
      <h6>4.2 Removal and Replacement of Nominees</h6>
      <p>
        Any Shareholder (or group of Shareholders) entitled nominate and elect a
        director may remove any such director by notice to such director, the
        other Shareholders and the Corporation. Any vacancy occurring on the
        Board by reason of the death, disqualification, inability to act,
        resignation or removal of any director may be filled only by a further
        nominee of the Shareholder or Shareholders whose nominee was so affected
        so as to maintain a Board consisting of the nominees specified in
        Section 4.1.{" "}
      </p>
      <h6>4.3 Matters Requiring Prior Approval</h6>
      <p>
        In addition to any approval, authorization, or ratification required by
        the Act, none of the following shall be carried out and executed by the
        Corporation without the prior approval of the Board and prior written
        approval of the Preferred Majority.{" "}
      </p>
      <ol type="a">
        <li>{paragraphPref}</li>
        <li>Any changes to the number of directors of the Corporation;</li>
        <li>
          Any corporate restructuring, amalgamation or merger of the Corporation
          with any other corporation; or
        </li>
        <li>
          The disposition of all or substantially all of the assets of any
          wholly owned subsidiary of the Corporation or the disposition of any
          shares of any wholly owned subsidiary of the Corporation.
        </li>
      </ol>
      <p>4.4 Meetings</p>
      <ol type="A">
        <li>
          Generally. The Board shall meet at such time and at such place as the
          Board may designate. Meetings of the Board may be held either in
          person or by means of telephonic, video conference or other
          communications facility that permits all participants to communicate
          adequately with each other during the meeting, at the offices of the
          Corporation or such other place (either within or outside Canada) as
          may be determined from time to time by the Board. Written notice of
          each meeting of the Board shall be given to each Director at least two
          clear days before each such meeting.
        </li>
        {!optOut && (
          <li>
            Quorum. The presence of a at least {directorData[0].quorum} Director
            then in office shall constitute a quorum. If a quorum is not
            achieved at any duly called meeting, such meeting may be postponed
            to a time no earlier than 72 hours after written notice of such
            postponement has been given to the Directors.
          </li>
        )}
      </ol>
      <h6>ARTICLE 5: COVENANTS OF THE CORPORATION</h6>
      <h6>5.1 Information Rights</h6>
      <p>
        The Corporation shall prepare and deliver to all the Major Investors the
        following information in the below manner:
      </p>
      <ol type="a">
        <li>
          At the end of every financial year, the Corporation shall deliver, as
          soon as available, unaudited financial statements including
          consolidated balance sheets of the Corporation and, if applicable, its
          subsidiaries as at the end of the financial year as well as
          consolidated statements of income, retained earnings and changes in
          cash flow of the Corporation and its subsidiaries, if applicable, for
          such year, all in accordance with generally accepted accounting
          principles in Canada;
        </li>
        <li>
          For every financial quarter, the management of the Corporation shall
          prepare and deliver a report regarding such quarter’s financial
          results and operations;
        </li>
        <li>
          Before the start of each financial year, the Corporation shall outline
          and deliver its proposed annual business plan as well as an operating
          and capital expenditure budget, approved by the Board;
        </li>
        <li>
          Other information responding to reasonable requests from Investors
          from time to time;
        </li>
      </ol>
      <h6>5.2 Other Covenats</h6>
      <p>
        Without limiting the validity of other covenants and provisions in
        Article 4, and unless waived by holders of Preferred Majority, the
        Corporation further agrees and covenants to abide by the following, and
        to have it subsidiaries, if any, do the same:
      </p>
      <ol type="a">
        <li>
          Financing. The Corporation shall inform the Board of all negotiations,
          offers or contracts relating to possible future financing for the
          Corporation, however this shall not be required where such financing
          is with trade creditors or if such financing relates to the
          Corporation’s use of commercial lending agreements with financial
          institutions.
        </li>
        <li>
          Proprietary Information and Inventions Agreements. From each current
          or future technical or managerial employee, contractor, or consultant
          working for the Corporation, the Corporation shall obtain a duly
          executed agreement relating to proprietary information and the
          assignment of inventions on terms that are acceptable to the Board.
        </li>
        <li>
          Confidentiality and Non-Compete Agreements. The Corporation shall have
          all key employees, and as necessary, contractors and consultants,
          enter into confidentiality agreements, non-competition agreements, and
          non-solicitation agreements that are acceptable to the Board.
        </li>
      </ol>
    </div>
  );
};

export const Article6 = function ({ createdDate }) {
  const certificate = `“The shares represented by this certificate are subject to
    all the terms and conditions of a Shareholders Agreement made as of ${createdDate}
    as it may be amended from time to time, which agreement contains,
    among other things, restrictions on the right of the holder hereof to transfer or sell the shares.
    A copy of such agreement is on file at the registered office of the Corporation.”`;
  return (
    <div>
      <AlertDialog
        title="ARTICLE 6: SHARE RIGHTS"
        info={
          <div>
            <p>
              This article tells the investor what legal rights to expect from
              their shares including votes, dividends, transfers, sales, and
              claims to equity.
            </p>
            <p>
              As share structures become more complex and the corporation nears
              an exit, having a clear explanation of the rights and procedures
              for owning shares allows investors to know exactly what they can
              expect and prevents conflicts. Moreover, having specific scenarios
              in mind can help resolve ambiguities before they arise (such as
              what happens to the shares when an investor passes away or becomes
              bankrupt).
            </p>
          </div>
        }
      />
      <AlertDialog
        title="6.1 Restrictions"
        info={
          <div>
            <p>
              This section restricts certain share rights when those shares have
              changed ownership to a shareholder that did not sign this
              agreement.
            </p>
            <p>
              Usually this happens when an investor dies or becomes bankrupt and
              their shares are automatically transferred to someone who is not a
              party to the shareholders agreement. To prevent that person from
              potentially abusing their rights before agreeing to be bound by
              the same rules as other shareholders, the corporation can restrict
              the rights of the transferred shares until the holder agrees and
              signs to this agreement.
            </p>
          </div>
        }
      />
      <ol>
        <li>
          Shareholders shall not Transfer any Shares to another Person or
          entity, except as expressly authorized by this Agreement. If Shares
          are transferred in contravention of this Agreement, the Corporation
          shall not Transfer on its ledger such shares or treat the owners of
          the Shares as valid Shareholders or otherwise give such owners any of
          the rights of the Shares that they have been transferred to in
          contravention of this Agreement.
        </li>
        <li>
          The following conditions apply to every Transfer of Shares by a
          Shareholder:
          <ol>
            <li>
              The proposed transferee must be legally bound in writing to become
              a party and be bound by this Agreement (if not already legally
              bound) by signing an acknowledgement substantially in the form
              displayed in Schedule “B”, annexed hereto.
            </li>
            <li>
              Such Transfer must be approved in accordance with the Articles and
              any transfer that follows the requirements of Article 6 shall be
              deemed to have been consented to by the Shareholders for the
              purposes of any restrictions on Transfer in the Articles; and,
            </li>
            <li>
              Such Shareholder shall provide to the Corporation with written
              assurances, in a form satisfactory to the Corporation, that the
              proposed transfer is exempt from registration and prospectus
              requirements of applicable securities laws, and that all
              appropriate action has been taken to comply with such laws.
            </li>
          </ol>
        </li>
      </ol>
      <AlertDialog
        title="6.2 Endorsement on Certificates"
        info={
          <div>
            <p>
              This section creates a certificate, which is like a receipt that
              records the shares owned by the investor.
            </p>
          </div>
        }
      />
      <p>
        Share certificates of the Corporation shall bear the following language
        in addition to such legends as may be required by applicable securities
        laws:{" "}
      </p>
      <p>{certificate}</p>
      <h6>6.3 Pre-Emptive Rights</h6>
      <p>
        The following provisions shall apply to the allotment and issue by the
        Corporation of any shares in its capital stock (“New Shares”):
      </p>
      <AlertDialog
        title="6.4 Permitted Transfers"
        info={
          <div>
            <p>
              This section explains what kinds of transfers can be authorized
              without requiring a formal vote or board approval.
            </p>
            <p>
              These can be helpful for tax purposes (eg: putting shares into a
              holding company to roll over their taxation) and may be attractive
              to investors.
            </p>
          </div>
        }
      />
      <ol type="A">
        <li>
          Each Investor may, after giving notice to the Corporation, transfer
          all or any part of its Shares beneficially owned by it to:
        </li>
        <ol type="a">
          <li>Any Affiliate of such Investor;</li>
          <li>
            Any fund under common management or Control with such Investor (or
            its successor by amalgamation), or whose manager or general partner,
            as applicable, is the same as or an Affiliate of the manager or
            general partner of the Investor (or its successor by amalgamation);
          </li>
          <li>
            Any shareholder(s), partner(s), member or investor(s) of such
            Investors where such Transfer is made in connection with a
            distribution of assets to any shareholder(s), partner(s), member(s),
            or investor(s) of the Investor;
          </li>
          <li>
            Any Person in connection with the sale of all or substantially all
            of the assets of such Investor or the liquidation or dissolution of
            such Investor; or
          </li>
          <li>
            Any financial institution that carries on the business of providing
            equity financing as part of a sale of a portfolio of equity
            interests by such Investor;
          </li>
          <li>
            So long as each transferee agrees to be bound by this Agreement and
            that no transferee or its Affiliates is a Competitor of the
            Corporation.
          </li>
        </ol>
        <li>
          Each Shareholder may, after giving notice to the Corporation, Transfer
          all or any part of its Shares beneficially owned by it to:
        </li>
        <ol type="i">
          <li>
            A corporation wholly owned by such Shareholder and/or their Family
            Members; or
          </li>
          <li>
            A custodian, trustee (including an RRSP, RIF, IRA, or similar
            retirement or investment fund) or other fiduciary for such
            Shareholder and/or their Family Members; or
          </li>
        </ol>
        <li>
          Provided that in the case of the Section 6.4 (B), the transferee
          agrees to be bound by this Agreement. In such event:
        </li>
        <ol type="a">
          <li>
            The transferring Shareholder shall remain a party to this Agreement;
          </li>
          <li>
            The transferring Shareholder shall take such actions as may be
            necessary to cause the transferee to at all times fully and
            faithfully discharge its obligations pursuant to this Agreement, and
            shall comply with its terms;
          </li>
          <li>
            The transferring Shareholder shall at all times after such Transfer
            be jointly and severally liable with the transferee for the
            discharge of the transferee’s obligations under this Agreement and
            compliance by the transferee with the terms and conditions of this
            Agreement; and,
          </li>
          <li>
            If the transferee is no longer a corporation wholly-owned by the
            transferring Shareholder and/or his respective Family Members or a
            custodian, trustee, or other fiduciary for such Shareholder and/or
            his Family Members, the transferee will immediately transfer all of
            the transferred Shares back to the Transferor.
          </li>
        </ol>
      </ol>
    </div>
  );
};

export const Article7 = function () {
  return (
    <div>
      <AlertDialog
        title="ARTICLE 7: SALE RIGHTS"
        info={
          <div>
            <p>
              This section tells the shareholder what their duties are when
              selling or transferring shares, as well as what they can expect
              when other investors sell shares
            </p>
            <p>
              Depending on what clauses are offered, different kinds of
              investors (and even other corporations prospecting for {"M & As"})
              can be attracted.
            </p>
          </div>
        }
      />
      <AlertDialog
        title="7.1 Rights of First Refusal"
        info={
          <div>
            <p>
              These rights ensure that the investors privy to the agreement will
              always have the “first dibs” on any sale of shares.
            </p>
            <p>
              The right of first offer means that the selling investor (the
              “vendor”) must first offer to sell their shares to any of the
              existing shareholders before selling to someone external. The
              right of first refusal means that if an investor receives a
              purchase offer for their shares from an external purchaser
              (someone with no shares in the corporation), then the investor
              must first ask any of the existing shareholders if they would like
              to purchase the investor’s shares on the same terms as the offer
              by the external purchaser.
            </p>
          </div>
        }
      />
      <p>
        Wherever used in this Agreement, “Third Party Offer” means a bona fide
        offer from an arm’s length third party for the purchase of all of the
        Shares owned by a Shareholder in the Corporation and pursuant to which:
      </p>
      <ol type="A">
        <li>
          No property other than such Shares is to be sold, transferred, leased,
          licensed, or otherwise disposed of;
        </li>
        <li>
          The sole consideration for such Shares is a stated dollar amount
          payable by certified cheque either at closing or in instalments or
          both; and,
        </li>
        <li>
          Such offer contains no terms or conditions which are so unique or
          unusual as to render the offer impossible to match on a commercially
          reasonable basis.
        </li>
      </ol>
      <h6>Third Party Offer</h6>
      <p>
        In the event that any Shareholder receives a Third Party Offer which
        they are prepared to accept, then the Disposing Shareholder shall give
        the Major Investors written notice (the “Offer Notice”) containing the
        identity of the Third Party, the terms and conditions of the Third-Party
        Offer, a true copy of the Third-Party Offer, and an offer (the
        “Disposing Shareholder’s Offer”) to sell the Offered Shares to the Major
        Investors at the same price per share and upon the same terms and
        conditions as are contained in the Third Party Offer. The Disposing
        Shareholder’s Offer shall be irrevocable for a period of thirty (30)
        days after receipt of the Offer Notice by the Major Investors.{" "}
      </p>
      <h6>Acceptance by Major Investors</h6>
      <p>
        The Major Investors may purchase the Offered Shares rateably based upon
        the number of Shares owned by them on a fully diluted basis, on the date
        the Offer Notice was given or in such other proportion as the Major
        Investors may agree. Each Major Investor who wishes to acquire Offered
        Shares has a period of ten (10) days from the date the Offer Notice was
        given (the “Offer Period”) to accept the Disposing Shareholder’s Offer
        on an irrevocable and unconditional basis. Such acceptance shall be
        evidenced by a notice in writing given by the Founder Shareholders to
        the Disposing Shareholder, the Corporation and the remaining
        Shareholders within the Offer Period (“Acceptance Notice”).
      </p>
      <h6>Offer to Remaining Shareholders</h6>
      <p>
        On the first Business Day following the last day of the Offer Period,
        the Corporation shall send a notice to each Shareholder indicating if
        Major Investors have agreed to purchase the Offered Shares. If a
        Shareholder does not give notice as provided in Article 10.17 or
        otherwise indicates that it does not wish to purchase Offered Shares and
        the Shareholders have not agreed among themselves to acquire those
        Offered Shares, the Offered Shares that such Shareholder had been
        entitled to purchase (the “Rejected Shares”) may instead be purchased by
        the Remaining Shareholders. Within five (5) Business Days after the end
        of the Offer Period (the “Extended Offer Period”), each remaining
        Shareholder who wishes to purchase Rejected Shares will give an
        additional notice (an “Additional Notice”) to the Disposing Shareholder,
        the Corporation and the other Shareholders setting out the number of
        Rejected Shares it is prepared to acquire. If the Remaining Shareholders
        have offered to acquire a total number of Rejected Shares in excess of
        the number of Rejected Shares available, unless the remaining
        Shareholders agree otherwise, the Rejected Shares shall be shall be
        allocated to the remaining Shareholders based on the lesser of the
        amount set out in its Additional Notice and its ratable share based on
        the number of Shares held by the remaining Shareholders, on a fully
        diluted basis, as of the date of the Offer Notice. If, after allocating
        the Rejected Shares as provided above, there remain any unallocated
        Rejected Shares, unless the Remaining Shareholders agree otherwise,
        those Rejected Shares shall be allocated among the Remaining
        Shareholders who did not receive the number of Rejected Shares specified
        in their Additional Notices based on the number of Shares held by those
        Shareholders, on a fully diluted basis, as of the date of the Offer
        Notice.
      </p>
      <h6>7.2 Drag Along Rights</h6>
      <p>If: </p>
      <ol type="I">
        <li>
          a third party offer is made to the Corporation and/or one or more of
          the Shareholders that provides for: (A.) any merger, amalgamation,
          reorganization, consolidation or other transaction involving the
          Corporation and any other corporation or other entity or person in
          which the persons who were the shareholders of the Corporation
          immediately prior to such merger, amalgamation, reorganization,
          consolidation or other transaction own less than fifty percent (30%)
          of the outstanding voting shares of the surviving or continuing entity
          after such merger, amalgamation, reorganization, consolidation or
          other transaction; (B.) the sale, exchange or transfer by the
          Corporation’s shareholders, in a single transaction or series of
          related transactions, of all of the voting shares of the Corporation
          (other than those held by the Person making the third party offer); or
          (C.) the sale, lease, license, abandonment, transfer or other
          disposition of all or substantially all the assets of the Corporation
          or the exclusive license of all or substantially all of the
          Corporation’s material intellectual property and technology (any
          transaction referred to in (A.), (B.) or (C.) above being hereinafter
          referred to as a “Sale Transaction”); and
        </li>
        <li>
          the Sale Transaction has been irrevocably accepted, or otherwise
          approved, by a Shareholder Majority, then, upon being notified by the
          Corporation or such third party offeror of the names of the
          Shareholders who have irrevocably accepted or otherwise approved such
          offer and the number of Shares in respect of which they have
          irrevocably accepted, or otherwise approved, the Sale Transaction,
          each Shareholder: (I.) shall, if the Sale Transaction involves a sale
          or other tender of Shares, sell all of the Shares held by such
          Shareholder to the third party offeror pursuant to the terms of the
          Sale Transaction in accordance with the offer upon the terms and at
          the price contained in the offer; (II.) shall vote in favour of (for
          the purposes of any approval acquired by the Act, the Articles, this
          Agreement or otherwise), and otherwise act, to approve the Sale
          Transaction and any continuance, reorganization or recapitalization or
          any other change to the Articles that is necessary or desirable to
          facilitate the Sale Transaction, as applicable; and (III.) shall
          provide such reasonable representations, warranties, indemnities,
          covenants, escrow agreements and other agreements as may be required
          by the third party offeror pursuant to such Sale Transaction. To the
          extent permitted by law, each Shareholder hereby expressly waives any
          right to dissent or appraisal under applicable laws with respect to
          the transactions or approvals referred to in clause (II.) above.
        </li>
      </ol>
      <h6>7.3 Lock Up</h6>
      <p>
        If requested in writing by the underwriters in connection with a
        Qualified IPO, each Shareholder will agree not to sell publicly any
        Shares (other than Shares being sold in such Qualified IPO), without the
        consent of such underwriters, for a period not to exceed 180 days
        following the closing of such Qualified IPO (or a longer period as may
        be reasonably requested by the underwriters to facilitate compliance
        with applicable research report publication restrictions); but only if
        all other Persons holding in excess of 5% of the capital stock of the
        Corporation on a fully diluted basis agree not to sell publicly their
        shares of the Corporation under the circumstances and pursuant to the
        terms set forth in this Section 6.3.
      </p>
    </div>
  );
};

export const Article8 = function () {
  return (
    <div>
      <AlertDialog
        title="ARTICLE 8: DISPOSITION OF SHARES"
        info={
          <div>
            <p>
              One-Liner: This section explains how the share transfers or sales
              are arranged. Expansion: Certain agreements to power of attorneys
              and waivers can simplify the process so that transfers of lesser
              importance or common to running a business can be authorized
              without the financial and time sinking costs of voting and
              authorizing each transaction.
            </p>
          </div>
        }
      />
      <h6>8.1 Closing</h6>
      <p>
        For any Shareholder who wishes or is required to sell Shares pursuant to
        6.1 and 6.2, the following provisions shall apply to such Transfer of
        Shares:
      </p>
      <ol type="A">
        <li>
          The Transfer shall be completed at the Corporation’s registered office
          on the date specified for closing. At such time, the transferor(s)
          shall Transfer to the transferee(s) good title to the Shares being
          transferred free and clear of all liens, charges, encumbrances, or
          restrictions, and deliver to the transferee(s) certificates and other
          documents of title evidencing ownership of the Shares being
          transferred, duly endorsed in blank for transfer by the holders of
          record. In addition, if the transferor is disposing of all or
          substantially all of its Shares, the transferor(s) shall deliver to
          the Corporation all records, accounts and other documents in its
          possession belonging to the Corporation and the resignations and
          releases of its nominees on the Board, all such resignations to be
          effective no later than the time of delivery. The transferee(s) shall
          deliver to the transferor(s) full payment of the purchase price
          (subject to any escrow or holdback requirement) payable for the Shares
          being transferred.
        </li>
        <li>
          If, at the time of closing, a transferor fails to complete the subject
          transaction of purchase and sale, the transferee (or, in the case of a
          Sale Transaction, the Corporation or any other Shareholder) shall have
          the right, if not in default under this Agreement, without prejudice
          to any other rights that it may have, upon payment by the transferee
          of that part of the purchase price payable to the transferor at the
          time of closing to the credit of the transferor in the main branch of
          the Corporation’s bank (or, in the case of a Sale Transaction in which
          the consideration consists of cash, securities or other assets, or any
          combination, with a third party escrow agent), to execute and deliver,
          on behalf of and in the name of the transferor, such deeds, transfers,
          share certificates, resignations or other documents that may be
          necessary to complete the subject transaction and the transferor
          hereby irrevocably appoints the transferee its attorney in that
          behalf. Such appointment and power of attorney, being coupled with an
          interest, shall not be revoked by the insolvency or bankruptcy of the
          transferor and the transferor hereby ratifies and confirms and agrees
          to ratify and confirm all that the transferee may lawfully do or cause
          to be done by virtue of such appointment and power.
        </li>
      </ol>
      <h6>8.2 Closing of Drag Along Offers</h6>
      <p>
        If a Sale Transaction contemplates a purchase of Shares and, at the time
        proposed for the closing of the Sale Transaction, a Shareholder fails to
        complete the transaction for any reason whatsoever, the party making the
        third party offer has the right to deposit that portion of the
        consideration for such Shareholder’s Shares to be paid at closing
        either, in the case where the consideration is in cash, to the credit of
        such Shareholder in the main branch of the Corporation’s bank, or, in
        the case of consideration consisting of cash, securities or other
        assets, or any combination of such consideration method, with a third
        party escrow agent. If the purchase price is so deposited, then from and
        after the date of deposit, even if certificates or instruments
        evidencing the Shares are not delivered to the third party making the
        third party offer:
      </p>
      <ol type="a">
        <li>
          The purchase is deemed to have been fully completed (subject to any
          obligation in the transaction of documents to make payments of
          portions of the purchase price after the closing date), and the
          records of the Corporation may be amended accordingly;
        </li>
        <li>
          All interest in the Shares is conclusively deemed to have been
          transferred and assigned to and to have become vested in the third
          party; and
        </li>
        <li>
          All interest of such Shareholder and of any other Person (other than a
          third party) having an interest in such Shares ceases.
        </li>
      </ol>
    </div>
  );
};

export const Article9 = function () {
  return (
    <div>
      <AlertDialog
        title="Confidentiality"
        info={
          <div>
            <p>
              This section is important since it makes sure that all
              shareholders are responsible in keeping the corporation’s
              information confidential.
            </p>
          </div>
        }
      />
      <h6>9.1 Confidentiality</h6>
      <p>
        In this section, the words “Confidential Information” shall mean all
        confidential information concerning the business, operations, financing,
        and affairs of the Corporation. This includes, without limiting the
        generality of the a fore said:
      </p>
      <ol type="a">
        <li>
          Such information as may be designated by a director, officer, or
          senior employee of the Corporation as being Confidential;
        </li>
        <li>
          All trade secrets, information about internal systems or operations,
          business methods, and know-how of the Corporation;
        </li>
        <li>
          All information relating to the Corporation or to any Person with
          which the Corporation does business and which is not generally known
          to Persons outside the Corporation;
        </li>
        <li>The Corporation’s customer lists and records;</li>
        <li>
          The Corporation’s marketing, pricing and sales policies, techniques,
          and concepts;
        </li>
        <li>
          The buying habits and preferences of the Corporation’s customers and
          prospective customers; and,
        </li>
        <li>
          The Corporation’s production records and financial records, including
          without limitation, accounts receivable records.
        </li>
      </ol>
      <p>
        If a Shareholder ceases to be a Shareholder of the Corporation, the
        Shareholder shall use all reasonable efforts to ensure that all
        Information and all copies thereof are either destroyed or returned to
        the Corporation if the Corporation so requests, and shall not, directly
        or indirectly, use for the Shareholder’s own purposes, any Information
        discovered or acquired by the Shareholder or the Shareholder’s advisors.
        The Party’s obligations in this Article shall be in addition to and not
        in derogation of any other obligation of confidentiality owed to the
        Corporation by the Major Investors or other Shareholders who are
        employees of or consultants to the Corporation.
      </p>
      <h6>9.1 Exclusions</h6>
      <p>
        The Restrictions contained in Article 9.1 shall not apply to any portion
        of the Confidential Information which becomes generally known to the
        public, unless the Shareholder in question is responsible for making the
        Confidential Information known to the public.
      </p>
      <h6>9.2 Remedies</h6>
      <p>
        Without prejudice to any other rights of the Corporation, the parties
        acknowledge and agree that if a Shareholder breaches or otherwise
        violates, or attempts to breach or otherwise violate, the provisions of
        this Article, the Corporation will likely suffer irreparable harm and an
        injunction or other like remedy shall be the only effective remedy to
        protect the Corporation’s rights and interests and that an interim
        injunction may be granted immediately on the commencement of any
        lawsuit.
      </p>
      <h6>9.4 Restrictions Reasonable</h6>
      <p>
        Each Shareholder acknowledges and agrees that in the context of the
        specific knowledge of the affairs of the Corporation held by it or him,
        the nature of the business carried on by the Corporation and the
        relationship of each Shareholder to the Corporation, the restrictions
        set out in this Article are reasonable and valid in all respects,
        including, without limitation, the nature of the restrictions, the time
        period concerned, and all defenses to the strict enforcement thereof are
        waived by each Shareholder.
      </p>
    </div>
  );
};

export const Article10 = function () {
  return (
    <div>
      <AlertDialog
        title="ARTICLE 10: GENERAL TERMS AND PROVISIONS"
        info={
          <div>
            <p>
              This article contains any other clauses that can be helpful for
              the agreement and procedural efficiency.
            </p>
          </div>
        }
      />
      <h6>Application of this Agreement</h6>
      <p>
        The terms of this Agreement shall apply to any Shares that may hereafter
        be issued by the Corporation and to any Shares or other Securities:
      </p>
      <ol type="a">
        <li>
          Resulting from the conversion, reclassification, redesignation,
          subdivision, consolidation, or other change to the Shares; or,
        </li>
        <li>
          Of the Corporation or any successor body corporate that may be
          received by the Shareholder’s on a merger, amalgamation, arrangement,
          or other reorganization of or including the Corporation;
        </li>
      </ol>
      <p>
        and prior to any action to in (a) or (b) above being taken the Parties
        shall give due consideration to any changes that may be required to this
        Agreement in order to give effect to the intent of this Section 9.1.
      </p>
      <h6>10.2 Aggregation of Shares</h6>
      <p>
        All of the Shares of each class held or acquired by each Shareholder
        and/or any Permitted Transferee of such Shareholder pursuant to Article
        5.4 of this Agreement shall be aggregated together for the purposes of
        determining the availability of any rights of such Shareholder under
        this Agreement.{" "}
      </p>
      <h6>10.3 Undertaking</h6>
      <p>
        The Parties undertaking to sign and complete all such deeds, documents,
        resolutions, minutes and other instruments and to do all such acts as
        are necessary to give full effect to the terms, conditions, and
        restrictions contemplated by this Agreement and to make them binding on
        the Parties as well as on third parties who are not privy to the terms
        hereof.
      </p>
      <h6>10.4 Other Obligations</h6>
      <p>
        The provisions of this Article shall apply in addition to, and not in
        substitution for, all obligations owed by the Shareholders to the
        Corporation at law or in equity, including, without limitation,
        fiduciary duties and duties of confidentiality.
      </p>
      <h6>10.5 Terms of Agreement</h6>
      <p>
        This Agreement shall come into force and be effective as of and from the
        date of this Agreement and will continue in full force until the earlier
        of the date upon which one of the Major Investors acquires all of the
        Issued Shares, this Agreement is terminated by the written agreement of
        the Major Investors or the Corporation is dissolved pursuant to the Act.
        Notwithstanding the foregoing, the obligation to pay all instalments for
        Issued Shares purchased pursuant to this Agreement shall survive any
        termination of this Agreement.
      </p>
      <h6>10.6 Dissolution, Liquidation or Winding-Up</h6>
      <p>
        Each Shareholder agrees that such Shareholder shall not bring any court
        application or commence any proceedings or take any action which either
        requests or may result in an order dissolving, liquidating, or winding
        up the Corporation.
      </p>
      <h6>10.7 Entire Agreement</h6>
      <p>
        This Agreement, including any Schedules attached to this Agreement,
        constitutes the entire agreement between he parties pertaining to the
        subject matter of this Agreement and supersedes all prior agreements,
        understandings, negotiations and discussions, whether oral or written,
        of the parties. There are no representations, warranties or other
        agreements, whether oral or written, between the parties in connection
        with the subject matter of this Agreement except as specifically set out
        in this Agreement. No amendment, supplement, modification, waiver or
        termination of this Agreement shall be binding on the parties unless
        same is in writing and signed by all of the parties.
      </p>
      <h6>10.8 No Waiver</h6>
      <p>
        No waiver of any provision of this Agreement shall be deemed to
        constitute a waiver of any other provision, whether or not similar, nor
        shall such waiver constitute a continuing waiver unless otherwise
        expressly provided. No forbearance by any party to seek a remedy for any
        breach by any other party of any provision of this Agreement shall
        constitute a waiver of any rights or remedies with respect to any
        subsequent breach.
      </p>
      <h6>10.9 Headings</h6>
      <p>
        The division of this Agreement into Articles and sections and the
        insertion of headings is for convenience of reference only and shall not
        affect the construction or interpretation of this Agreement or any part
        of it.
      </p>
      <h6>10.10 References to Articles</h6>
      <p>
        Any reference to an Article, section or Schedule in this Agreement shall
        be deemed a reference to the applicable Article, section or Schedule
        contained in this Agreement and to no other agreement or document unless
        specific reference is made to such other agreement or document.
      </p>
      <h6>10.11 Statutes</h6>
      <p>
        Any reference to a statute in this Agreement includes a reference to all
        regulations made pursuant to such statute, all amendments made to such
        statute and regulations in force from time to time and to any statute or
        regulation which may be passed and which has the effect of supplementing
        or superseding such statute or regulations.
      </p>
      <h6>10.12 Applicable Law</h6>
      <p>
        This Agreement shall be construed in accordance with the laws of the
        Province of Ontario (other than Ontario principles of conflicts of law)
        and the laws of Canada applicable in the Province of Ontario and shall
        be treated in all respects as an Ontario contract. Each of the parties
        irrevocably attorns to the jurisdiction of the courts of the Province of
        Ontario.
      </p>
      <h6>10.13 Time</h6>
      <p>
        Time shall be of the essence of this Agreement and no extension or
        variation of this Agreement shall operate as a waiver of this provision.
        When calculating the period of time within which or following which any
        act is to be done or step taken pursuant to this Agreement, the date
        which is the reference date in calculating such period shall be
        excluded. If the last day of such period is not a Business Day, the
        period in question shall end on the next following Business Day.
      </p>
    </div>
  );
};

export const Article10b = function ({ corpName, corpContact, corpFax }) {
  return (
    <div>
      <h6>10.14 Further Assurances</h6>
      <p>
        The parties shall with reasonable diligence do all such things and
        provide all such reasonable assurances as may be required to consummate
        the transactions contemplated by this Agreement. Each party shall
        provide and execute such further documents or instruments as may be
        reasonably required by any other party, exercise its influence and do
        and perform or cause to be done or performed such further and other acts
        as may be reasonably necessary or desirable to effect the purpose of and
        to carry out the provisions of this Agreement.
      </p>
      <h6>10.15 Authorization for Assignment</h6>
      <p>
        If any party to this Agreement seeks to assign the rights, benefits,
        remedies, and obligations under this Agreement to another party, subject
        to the requirements of Permitted Transfers, a party may only do so with
        the prior written consent of the Corporation and a Preferred Majority.
      </p>
      <h6>10.16 Amendments</h6>
      <p>
        No amendment, supplement or modification of this Agreement and, unless
        otherwise specified, no waiver, consent or approval by any Party, is
        binding unless approved by the Board, and approved in writing by the
        Major Investors. Notwithstanding the above:
      </p>
      <ol type="a">
        <li>
          amendment of this Agreement that treats some Shares of a particular
          class in a manner that is not similar to the remaining Shares of such
          class is ineffective without the written consent of the Shareholder
          whose Shares of such class are not treated in a similar matter to the
          remaining Shares or, if there is more than one Shareholder holding
          such Shares, the Shareholders holding at least a majority of the
          Shares of such class that are not treated in a similar manner to the
          remaining Shares; and,
        </li>
        <li>
          the Parties agree that the Corporation is entitled to, and the
          Corporation shall, make such amendments from time to time as may be
          necessary to reflect permitted changes in the Shareholders and their
          shareholdings.
        </li>
      </ol>
      <h6>10.17 Notices</h6>
      <p>
        Any notice, consent, or approval required or permitted to be given by
        this Agreement (a “Notice”) shall be in writing and shall be
        sufficiently given only if delivered (whether in person, fax, courier
        service, or other personal method of delivery) to:
      </p>
      <ol type="a">
        <li>For a Notice to the Corporation, to:</li>
        <ol type="a">
          <li>{corpName}</li>
          <ol type="i">
            <li>ATT: {corpContact}</li>
            <li>Fax: {corpFax} </li>
          </ol>
          <li>
            In the case of a Notice to any Investor, at the address for notice
            contained in Schedule “A” of the Subscription Agreement; and,{" "}
          </li>
        </ol>
        <li>
          In the case of Notice to any other Shareholder, at the address in the
          records of the Corporation with respect to such Shareholder.{" "}
        </li>
      </ol>
      <p>
        Any notice or other communication delivered personally or by prepaid
        courier service shall be deemed to have been given and received on the
        day it is so delivered at such address, provided that if such day is not
        a Business Day such notice or other communication shall be deemed to
        have been given and received on the next following Business Day. Any
        notice or other communication transmitted by electronic communication
        shall be deemed given and received on the day of its transmission
        provided that such day is a Business Day and such transmission is
        completed before 5:00 p.m. on such day, failing which such notice or
        other communication shall be deemed given and received on the next
        following Business Day. Regardless of the foregoing, if there is a mail
        stoppage or labour dispute or threatened labour dispute which has
        affected or could affect normal mail delivery by Canada Post, then no
        notice or other communication may be delivered by registered mail. If
        there has been a mail stoppage and if a party sends a notice or other
        communication by fax, telex or other similar means of electronic
        communication, such party shall be relieved from the obligation to mail
        the original document in accordance with this section.
      </p>
      <h6>10.18 Binding Effect</h6>
      <p>
        This Agreement shall enure to the benefit of and shall be binding upon
        the parties and their respective heirs, executors, administrators,
        successors and permitted assigns.{" "}
      </p>
      <h6>10.19 Independent Legal Advice</h6>
      <p>
        EACH OF THE PARTIES ACKNOWLEDGES THAT HAVING HAD THE TIME AND
        OPPORTUNITY TO CONSIDER THIS AGREEMENT UPON THE ADVICE OF THEIR OWN
        INDEPENDENT LEGAL COUNSEL, AND HAVE BEEN ADVISED TO DO SO. NO PARTY
        SHALL CLAIM NON-APPLICABILIY OF ANY OF THE PROVISIONS HEREIN FOR THE
        FAILURE TO DO SO.
      </p>
    </div>
  );
};
