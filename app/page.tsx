import { getSiteSettings } from "@/lib/content/artist";
import { getLatestRelease, getReleases } from "@/lib/content/releases";
import { getPhotoAlbums } from "@/lib/content/photos";
import { getFreestyles } from "@/lib/content/freestyles";
import { getUpcomingTourEvents, getPastTourEvents } from "@/lib/content/tour";
import { HomeStage } from "@/components/home/HomeStage";
import { Hero } from "@/components/home/Hero";
import { CurrentReleaseCallout } from "@/components/home/CurrentReleaseCallout";
import { SocialLinks } from "@/components/social/SocialLinks";
import { Marquee } from "@/components/ui/Marquee";
import { Panel } from "@/components/panels/Panel";
import { AboutPanel } from "@/components/about/AboutPanel";
import { MusicPanel } from "@/components/music/MusicPanel";
import { ArchivePanel } from "@/components/archive/ArchivePanel";
import { TourPanel } from "@/components/tour/TourPanel";

export default async function HomePage() {
  const [settings, latestRelease, releases, albums, freestyles, upcoming, past] = await Promise.all([
    getSiteSettings(),
    getLatestRelease(),
    getReleases(),
    getPhotoAlbums(),
    getFreestyles(),
    getUpcomingTourEvents(),
    getPastTourEvents(),
  ]);

  return (
    <>
      <HomeStage>
        <Hero
          name={settings.artist.name}
          tagline={settings.artist.tagline}
          wordmark={settings.artist.wordmark}
        />
        <Marquee text={settings.statusLine} />
        {latestRelease ? <CurrentReleaseCallout release={latestRelease} /> : null}
        <div className="mx-auto flex max-w-5xl justify-center px-4 py-10 sm:px-6">
          <SocialLinks />
        </div>
      </HomeStage>

      <div className="mx-auto max-w-5xl space-y-6 px-4 py-6 sm:px-6">
        <Panel id="about" title="ABOUT.SYS">
          <AboutPanel settings={settings} />
        </Panel>
        <Panel id="music" title="MUSIC.SYS">
          <MusicPanel releases={releases} />
        </Panel>
        <Panel id="archive" title="ARCHIVE.SYS">
          <ArchivePanel albums={albums} freestyles={freestyles} />
        </Panel>
        <Panel id="tour" title="TOUR.SYS">
          <TourPanel upcoming={upcoming} past={past} />
        </Panel>
      </div>
    </>
  );
}
