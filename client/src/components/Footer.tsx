import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Warmtestoringen Zoeker |{" "}
              <PrivacyDialog />
            </p>
          </div>
          <div className="flex space-x-4">
            <ContactButton />
            <AboutDialog />
          </div>
        </div>
      </div>
    </footer>
  );
}

function ContactButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>Contact</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact Informatie</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <p className="text-sm text-muted-foreground">
            Voor ondersteuning of vragen over deze applicatie:
          </p>
          <div className="space-y-2">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span className="text-sm">+31 (0)20 123 4567</span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className="text-sm">support@warmtestoringen.nl</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Voor spoedeisende verwarmingsproblemen raden wij aan om direct contact op te nemen met een erkend installateur.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PrivacyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-primary hover:text-primary-dark transition-colors p-0 h-auto">
          Privacybeleid
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Privacybeleid</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4 text-sm">
          <p className="text-muted-foreground">
            Bij Warmtestoringen Zoeker respecteren wij uw privacy en zetten wij ons in voor de bescherming van uw persoonsgegevens.
          </p>
          
          <div>
            <h4 className="font-medium text-secondary mb-1">Gegevensverzameling</h4>
            <p className="text-muted-foreground">
              Deze applicatie verzamelt geen persoonlijke gegevens. 
              Zoekopdrachten worden niet gekoppeld aan individuele gebruikers en worden alleen anoniem gebruikt
              voor het verbeteren van onze zoekfunctionaliteit.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-secondary mb-1">Cookies</h4>
            <p className="text-muted-foreground">
              We gebruiken alleen functionele cookies die noodzakelijk zijn voor het functioneren van de applicatie. 
              Er worden geen tracking- of marketing cookies gebruikt.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-secondary mb-1">Wijzigingen</h4>
            <p className="text-muted-foreground">
              Dit privacybeleid kan worden bijgewerkt. De meest recente versie is altijd beschikbaar op deze website.
            </p>
          </div>
          
          <p className="text-muted-foreground">
            Laatste update: 1 juni 2023
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AboutDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-sm text-muted-foreground hover:text-primary transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
          <span>Over ons</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Over Warmtestoringen Zoeker</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <p className="text-sm text-muted-foreground">
            Warmtestoringen Zoeker is ontwikkeld om zowel bewoners als professionals te helpen bij het identificeren
            en oplossen van verwarmingsproblemen op een snelle en efficiënte manier.
          </p>
          
          <div>
            <h4 className="font-medium text-secondary mb-1">Onze missie</h4>
            <p className="text-sm text-muted-foreground">
              Het vereenvoudigen van de diagnose en het oplossen van verwarmingsproblemen door technische informatie
              toegankelijk te maken voor iedereen, ongeacht hun technische kennis.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-secondary mb-1">Bronnen</h4>
            <p className="text-sm text-muted-foreground">
              Onze database is samengesteld uit officiële documentatie van diverse verwarmingsfabrikanten, aangevuld
              met praktijkervaring van ervaren monteurs. We streven naar volledige en accurate informatie voor alle
              gangbare verwarmingssystemen.
            </p>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Heeft u suggesties voor verbetering of wilt u bijdragen aan onze database?
            Neem dan contact met ons op via de contactpagina.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
