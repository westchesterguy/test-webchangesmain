import Link from "next/link";

export function BedfordBedfordHillsKatonahExplained() {
  return (
    <>
      <p className="text-subheading text-charcoal font-light leading-relaxed">
        Here&apos;s something that trips up almost everyone new to the area:
        Bedford, Bedford Hills, and Katonah are not three different towns.
        They&apos;re three hamlets inside one town (the Town of Bedford)
        and they feel about as different from each other as three places
        can. If you&apos;ve been told to &ldquo;look in Bedford,&rdquo; that
        instruction is nearly useless until you know which of the three someone
        meant.
      </p>

      <h2 className="font-display text-2xl text-charcoal pt-4">
        Bedford Village: the historic one
      </h2>

      <p>
        When people say Bedford and mean the postcard, they mean{" "}
        <Link href="/communities/bedford" className="underline underline-offset-2">
          Bedford Village
        </Link>
        . It&apos;s built around a village green that has been the center of town
        since the 1700s, ringed by a historic district: the old
        courthouse, the library, white clapboard and stone, the kind of place
        that looks like it was cast for a period film and never struck the set.
      </p>

      <p>
        Life radiates out from that green onto larger lots. This is estate
        territory: more land, more trees, more distance between you and the next
        mailbox. There&apos;s no train station in the village itself, so
        residents drive to Bedford Hills or Katonah to catch the Harlem Line.
        Who&apos;s it for? People who want land, history, and quiet, and who
        don&apos;t mind driving to the platform and to most errands. If your
        dream is a stone wall, a long driveway, and total privacy, this is your
        hamlet.
      </p>

      <h2 className="font-display text-2xl text-charcoal pt-4">
        Bedford Hills: the commuter&apos;s hamlet
      </h2>

      <p>
        Bedford Hills is the practical middle child, and I mean that as a
        compliment. It has its own Metro-North station on the Harlem Line, a
        walkable commercial stretch near the tracks, and a mix of housing that
        tends to sit on more manageable lots than the estates up the road.
      </p>

      <p>
        This is the hamlet for people who prize the commute above all, who
        want to roll out of bed, walk or drive a few minutes, and be on a train
        to Grand Central. You get proximity to everything the Town of Bedford
        offers (the countryside a mile away, the village green a short
        drive off) without necessarily buying the acreage. For a lot of
        families making the move from the city, Bedford Hills is the sweet spot
        they didn&apos;t know to ask for.
      </p>

      <h2 className="font-display text-2xl text-charcoal pt-4">
        Katonah: the walkable one
      </h2>

      <p>
        <Link href="/communities/katonah" className="underline underline-offset-2">
          Katonah
        </Link>{" "}
        is the hamlet that surprises city people, because it has the one thing
        they were afraid they&apos;d lose: a real Main Street. You can live here
        and walk to coffee, dinner, the bookstore, the train.
      </p>

      <p>
        There&apos;s a reason it feels so tidy. The village was relocated to
        higher ground in the 1890s when the New Croton Reservoir was built, so
        its streets were laid out on a plan, a rare thing for a hamlet of
        this vintage. On top of the walkability, Katonah punches far above its
        size culturally: the Katonah Museum of Art and Caramoor are both here,
        and John Jay&apos;s homestead sits just outside town. It&apos;s for
        people who want suburban space but refuse to give up the ability to walk
        out the door and be somewhere. Of the three, it&apos;s the closest thing
        to bringing a slice of city texture with you.
      </p>

      <h2 className="font-display text-2xl text-charcoal pt-4">
        So which one?
      </h2>

      <p>
        Rough cut: Bedford Village if you want land and history and don&apos;t
        mind driving. Bedford Hills if the commute is king and you&apos;d rather
        not over-buy on acreage. Katonah if walkability and a downtown are
        non-negotiable. One town, three genuinely different daily lives.
      </p>

      <p>
        The catch is that these are generalizations, and the right answer always
        comes down to the specific street, the specific house, and what your
        specific week looks like. That&apos;s the conversation I love having.
        Look through the{" "}
        <Link href="/communities" className="underline underline-offset-2">
          town guides
        </Link>
        , and when you want to walk a few of these hamlets with someone who knows
        the difference between them,{" "}
        <Link href="/contact" className="underline underline-offset-2">
          call the Westchester Guy
        </Link>
        .
      </p>
    </>
  );
}
