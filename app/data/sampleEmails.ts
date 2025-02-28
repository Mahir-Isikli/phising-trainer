export interface HighlightElement {
  text: string;
  type: 'suspicious' | 'legitimate';
  explanation: string;
}

export interface EmailData {
  id: number;
  subject: string;
  from: {
    name: string;
    email: string;
  };
  content: string;
  isPhishing: boolean;
  explanation: string;
  highlights: {
    subject?: HighlightElement[];
    sender?: HighlightElement[];
    content: HighlightElement[];
  };
}

export const sampleEmails: EmailData[] = [
  {
    id: 1,
    subject: "Transponder Austausch für Walter Wieck",
    from: {
      name: "Lena von Schroetter",
      email: "vonschroetter@gastart.de"
    },
    content: `Hallo Cora,

zur Information: Walter Wieck hat heute einen neuen Transponder (#03T94F8) mit Alarmanlage (#A19) erhalten. Sein alter Transponder (#03T8U4E) wurde von ihm zurückgegeben.

Viele Grüße,
Lena von Schroetter
Fuhrparkmanagement`,
    isPhishing: false,
    explanation: "Legitime interne Kommunikation über einen Geräteaustausch, typisch für Fuhrparkmanagement.",
    highlights: {
      sender: [
        {
          text: "vonschroetter@gastart.de",
          type: "legitimate",
          explanation: "E-Mail-Adresse verwendet die korrekte Firmen-Domain."
        }
      ],
      content: [
        {
          text: "#03T94F8",
          type: "legitimate",
          explanation: "Spezifische Transpondernummer, deutet auf interne Systemdaten hin."
        },
        {
          text: "#A19",
          type: "legitimate",
          explanation: "Spezifische Alarmanlagennummer, deutet auf interne Systemdaten hin."
        },
        {
          text: "#03T8U4E",
          type: "legitimate",
          explanation: "Referenz zum alten Transponder, konsistent mit dem Kontext."
        }
      ]
    }
  },
  {
    id: 2,
    subject: "WICHTIG: Ihr Konto wurde vorübergehend gesperrt",
    from: {
      name: "Online Bank Sicherheitsteam",
      email: "security@onlinebank-service.net"
    },
    content: `Sehr geehrte/r Kundin/Kunde,

wir haben ungewöhnliche Anmeldeaktivitäten von einem unbekannten Gerät in Ihrem Online-Banking-Konto festgestellt. Aus Sicherheitsgründen wurde Ihr Konto vorübergehend gesperrt.

Um Ihr Konto wieder zu aktivieren und unbefugten Zugriff zu verhindern, bestätigen Sie bitte Ihre Identität über den folgenden Link:

[Konto reaktivieren](https://onlinebank-service.net/verify/login)

Bitte beachten Sie, dass Ihr Konto dauerhaft gesperrt wird, wenn Sie die Verifizierung nicht innerhalb von 24 Stunden abschließen.

Vielen Dank für Ihr Verständnis.

Mit freundlichen Grüßen,
Ihr Online Bank Sicherheitsteam`,
    isPhishing: true,
    explanation: "Phishing-E-Mail, die Dringlichkeit und Angst erzeugt, um Benutzer zur Preisgabe von Anmeldedaten zu bewegen. Die Domain ist verdächtig.",
    highlights: {
      subject: [
        {
          text: "WICHTIG: Ihr Konto wurde vorübergehend gesperrt",
          type: "suspicious",
          explanation: "Alarmierender Betreff, typisch für Phishing-Versuche."
        }
      ],
      sender: [
        {
          text: "onlinebank-service.net",
          type: "suspicious",
          explanation: "Domain 'onlinebank-service.net' ist nicht die offizielle Domain einer bekannten Bank."
        }
      ],
      content: [
        {
          text: "ungewöhnliche Anmeldeaktivitäten",
          type: "suspicious",
          explanation: "Vage Begründung, die Angst vor Kontoverlust auslösen soll."
        },
        {
          text: "innerhalb von 24 Stunden",
          type: "suspicious",
          explanation: "Zeitdruck soll unüberlegte Handlung provozieren."
        },
        {
          text: "https://onlinebank-service.net/verify/login",
          type: "suspicious",
          explanation: "Link führt zu einer verdächtigen Domain, wahrscheinlich eine gefälschte Login-Seite."
        }
      ]
    }
  },
  {
    id: 3,
    subject: "Versandbestätigung für Ihre Amazon.de Bestellung (Nr. 739-8573920-9582749)",
    from: {
      name: "Amazon.de Versandservice",
      email: "versandinfo@amazon-bestellung-de.com"
    },
    content: `Guten Tag [Ihr Name],

Ihre Amazon.de Bestellung mit der Bestellnummer 739-8573920-9582749 wurde soeben versandt.

Um den aktuellen Sendungsstatus einzusehen, klicken Sie bitte auf den folgenden Link:

[Sendung verfolgen](https://amazon-de.tracking-portal.info/track/739-8573920-9582749)

Vielen Dank für Ihren Einkauf bei Amazon.de!

Mit freundlichen Grüßen,
Ihr Amazon.de Versandteam`,
    isPhishing: true,
    explanation: "Phishing-Versuch durch Vortäuschen einer Amazon-Versandbestätigung. Die Domain der Absenderadresse und des Links sind nicht offiziell.",
    highlights: {
      sender: [
        {
          text: "amazon-bestellung-de.com",
          type: "suspicious",
          explanation: "Die Domain 'amazon-bestellung-de.com' ist nicht die offizielle Amazon-Domain (amazon.de)."
        }
      ],
      content: [
        {
          text: "[Ihr Name]",
          type: "suspicious",
          explanation: "Generische Anrede, typisch für Massen-Phishing-E-Mails."
        },
        {
          text: "https://amazon-de.tracking-portal.info/track/739-8573920-9582749",
          type: "suspicious",
          explanation: "Die Tracking-URL 'amazon-de.tracking-portal.info' ist nicht die offizielle Amazon-Tracking-Seite."
        }
      ]
    }
  },
  {
    id: 4,
    subject: "Meeting Einladung: Projekt Alpha - Nächste Schritte",
    from: {
      name: "Aykac Demir",
      email: "aykac@gastart.de"
    },
    content: `Hallo Team,

ich lade euch zu einem kurzen Meeting ein, um die nächsten Schritte im Projekt Alpha zu besprechen.

Datum: Donnerstag, 18. April 2024
Uhrzeit: 11:00 - 12:00 Uhr
Ort: Meetingraum Orion

Agenda:
- Review der letzten Woche
- Aufgabenverteilung für KW 17
- Offene Fragen und Diskussion

Bitte gebt kurz Bescheid, ob der Termin passt.

Viele Grüße,
Aykac Demir
Projektmanager`,
    isPhishing: false,
    explanation: "Legitime interne Meeting-Einladung mit klaren Angaben zu Projekt, Datum, Uhrzeit, Ort und Agenda.",
    highlights: {
      sender: [
        {
          text: "aykac@gastart.de",
          type: "legitimate",
          explanation: "E-Mail-Adresse verwendet die korrekte Firmen-Domain."
        }
      ],
      content: [
        {
          text: "Projekt Alpha",
          type: "legitimate",
          explanation: "Bezug zu einem internen Projekt, plausibel im Arbeitskontext."
        },
        {
          text: "Meetingraum Orion",
          type: "legitimate",
          explanation: "Nennung eines internen Meetingraums, deutet auf interne Kommunikation hin."
        },
        {
          text: "Aufgabenverteilung für KW 17",
          type: "legitimate",
          explanation: "Verwendung von 'KW' (Kalenderwoche) ist typisch für Geschäftskommunikation."
        }
      ]
    }
  },
  {
    id: 5,
    subject: "DHL Express: Zustellung Ihres Pakets verzögert - Handlungsbedarf!",
    from: {
      name: "DHL Express Benachrichtigung",
      email: "dhl-paketinfo@dhl-express-hilfe.com"
    },
    content: `Sehr geehrte/r Empfänger/in,

leider verzögert sich die Zustellung Ihres DHL Express Pakets mit der Sendungsnummer 4829573829DE.

Grund: Unzustellbare Adresse.

Um eine erneute Zustellung zu ermöglichen, bestätigen und korrigieren Sie bitte Ihre Adresse umgehend über den folgenden Link:

[Adresse aktualisieren](https://dhl-adresskorrektur.delivery-service-portal.com/update)

Andernfalls muss Ihr Paket an den Absender zurückgesandt werden.

Mit freundlichen Grüßen,
Ihr DHL Express Kundenservice`,
    isPhishing: true,
    explanation: "Phishing-E-Mail, die ein Zustellproblem vortäuscht, um Benutzer zur Eingabe persönlicher Daten auf einer gefälschten Seite zu bewegen. Die Domain ist verdächtig.",
    highlights: {
      sender: [
        {
          text: "dhl-express-hilfe.com",
          type: "suspicious",
          explanation: "Domain 'dhl-express-hilfe.com' ist nicht die offizielle DHL-Domain (dhl.de)."
        }
      ],
      content: [
        {
          text: "Zustellung Ihres Pakets verzögert - Handlungsbedarf!",
          type: "suspicious",
          explanation: "Alarmierender Betreff, der Dringlichkeit und Handlungsdruck erzeugt."
        },
        {
          text: "Unzustellbare Adresse",
          type: "suspicious",
          explanation: "Vorgegebener Grund, um Benutzer zur Adressbestätigung zu bewegen."
        },
        {
          text: "https://dhl-adresskorrektur.delivery-service-portal.com/update",
          type: "suspicious",
          explanation: "Link führt zu einer verdächtigen Domain, wahrscheinlich eine gefälschte Seite zur Datenerfassung."
        }
      ]
    }
  },
  {
    id: 6,
    subject: "Gehaltsabrechnung März 2024 für Mary Weber",
    from: {
      name: "Personalbüro Gastart GmbH",
      email: "gehaltsabrechnung@gastart.de"
    },
    content: `Sehr geehrte Frau Weber,

im Anhang finden Sie Ihre Gehaltsabrechnung für den Monat März 2024.

Bitte prüfen Sie die Abrechnung sorgfältig. Bei Fragen oder Unstimmigkeiten wenden Sie sich bitte an das Personalbüro.

Mit freundlichen Grüßen,
Personalbüro
Gastart GmbH`,
    isPhishing: false,
    explanation: "Legitime E-Mail mit Gehaltsabrechnung von der Personalabteilung, verwendet korrekte Firmen-Domain und persönliche Anrede.",
    highlights: {
      sender: [
        {
          text: "gehaltsabrechnung@gastart.de",
          type: "legitimate",
          explanation: "E-Mail-Adresse verwendet die korrekte Firmen-Domain."
        }
      ],
      content: [
        {
          text: "Gehaltsabrechnung März 2024",
          type: "legitimate",
          explanation: "Klarer Betreff, der den Inhalt der E-Mail präzise beschreibt."
        },
        {
          text: "Sehr geehrte Frau Weber",
          type: "legitimate",
          explanation: "Persönliche Anrede, typisch für individuelle Kommunikation."
        },
        {
          text: "Personalbüro Gastart GmbH",
          type: "legitimate",
          explanation: "Klare Absenderangabe, inklusive Firmenname."
        }
      ]
    }
  },
  {
    id: 7,
    subject: "PayPal Sicherheitswarnung: Ungewöhnliche Aktivitäten in Ihrem Konto",
    from: {
      name: "PayPal Sicherheit",
      email: "paypal-sicherheit@paypal-konto-schutz.net"
    },
    content: `Sehr geehrte/r PayPal-Nutzer/in,

wir haben ungewöhnliche Aktivitäten in Ihrem PayPal-Konto festgestellt, möglicherweise durch unbefugten Zugriff.

Zu Ihrem Schutz haben wir Ihr Konto vorübergehend eingeschränkt. Um die Einschränkung aufzuheben und Ihr Konto zu sichern, bestätigen Sie bitte Ihre Identität über den folgenden Link:

[Konto bestätigen](https://paypal-konto-schutz.net/security/verify)

Bitte führen Sie die Kontoüberprüfung innerhalb von 48 Stunden durch, um eine dauerhafte Einschränkung zu vermeiden.

Vielen Dank für Ihre Mithilfe.

Mit freundlichen Grüßen,
Ihr PayPal Sicherheitsteam`,
    isPhishing: true,
    explanation: "Phishing-E-Mail, die eine Sicherheitswarnung von PayPal vortäuscht, um Benutzer zur Eingabe von Anmeldedaten zu bewegen. Die Domain ist verdächtig.",
    highlights: {
      subject: [
        {
          text: "PayPal Sicherheitswarnung: Ungewöhnliche Aktivitäten in Ihrem Konto",
          type: "suspicious",
          explanation: "Alarmierender Betreff, der Angst vor Kontoverlust auslösen soll."
        }
      ],
      sender: [
        {
          text: "paypal-konto-schutz.net",
          type: "suspicious",
          explanation: "Domain 'paypal-konto-schutz.net' ist nicht die offizielle PayPal-Domain (paypal.com)."
        }
      ],
      content: [
        {
          text: "ungewöhnliche Aktivitäten in Ihrem PayPal-Konto",
          type: "suspicious",
          explanation: "Vage Bedrohung, die Angst vor Kontoverlust auslösen soll."
        },
        {
          text: "innerhalb von 48 Stunden",
          type: "suspicious",
          explanation: "Zeitdruck soll unüberlegte Handlung provozieren."
        },
        {
          text: "https://paypal-konto-schutz.net/security/verify",
          type: "suspicious",
          explanation: "Link führt zu einer verdächtigen Domain, wahrscheinlich eine gefälschte PayPal-Login-Seite."
        }
      ]
    }
  },
  {
    id: 8,
    subject: "Erinnerung: Jährliche Mitarbeiterschulung zum Datenschutz",
    from: {
      name: "Datenschutzbeauftragter Gastart GmbH",
      email: "datenschutz@gastart.de"
    },
    content: `Hallo zusammen,

dies ist eine freundliche Erinnerung an die jährliche Mitarbeiterschulung zum Thema Datenschutz.

Bitte absolvieren Sie die Online-Schulung bis zum Ende der kommenden Woche. Den Link zur Schulung finden Sie hier:

[Zur Datenschutzschulung](https://intranet.gastart.de/datenschutzschulung)

Bei Fragen stehe ich Ihnen gerne zur Verfügung.

Vielen Dank für Ihre Kooperation!

Mit freundlichen Grüßen,
Thomas Müller
Datenschutzbeauftragter`,
    isPhishing: false,
    explanation: "Legitime interne Erinnerung an eine verpflichtende Datenschutzschulung, verwendet korrekte Firmen-Domain und professionelle Sprache.",
    highlights: {
      sender: [
        {
          text: "datenschutz@gastart.de",
          type: "legitimate",
          explanation: "E-Mail-Adresse verwendet die korrekte Firmen-Domain."
        }
      ],
      content: [
        {
          text: "Jährliche Mitarbeiterschulung zum Datenschutz",
          type: "legitimate",
          explanation: "Klarer Betreff, der auf eine interne Schulung hinweist."
        },
        {
          text: "Online-Schulung",
          type: "legitimate",
          explanation: "Hinweis auf eine übliche Form der internen Weiterbildung."
        },
        {
          text: "intranet.gastart.de",
          type: "legitimate",
          explanation: "Link verweist auf das interne Intranet, typisch für interne Ressourcen."
        }
      ]
    }
  },
  {
    id: 9,
    subject: "Glückwunsch! Sie haben 1.000€ bei unserem Gewinnspiel gewonnen!",
    from: {
      name: "Online Gewinnzentrale",
      email: "gewinnbenachrichtigung@online-gewinn-aktion.com"
    },
    content: `Sehr geehrte/r Herr Weber,

herzlichen Glückwunsch! Sie haben bei unserem aktuellen Online-Gewinnspiel 1.000€ gewonnen!

Um Ihren Gewinn zu beanspruchen, klicken Sie bitte auf den folgenden Link und bestätigen Sie Ihre persönlichen Daten:

[Gewinn bestätigen](https://online-gewinn-aktion.com/gewinn-anfordern)

Bitte beachten Sie, dass Ihr Gewinnanspruch verfällt, wenn Sie ihn nicht innerhalb von 7 Tagen bestätigen.

Mit freundlichen Grüßen,
Ihr Online Gewinnspiel Team`,
    isPhishing: true,
    explanation: "Phishing-E-Mail, die einen unerwarteten Gewinn vortäuscht, um Benutzer zur Preisgabe persönlicher Daten auf einer gefälschten Seite zu bewegen. Die Domain ist verdächtig.",
    highlights: {
      subject: [
        {
          text: "Glückwunsch! Sie haben 1.000€ bei unserem Gewinnspiel gewonnen!",
          type: "suspicious",
          explanation: "Verlockender Betreff, der unrealistische Gewinnversprechen macht."
        }
      ],
      sender: [
        {
          text: "online-gewinn-aktion.com",
          type: "suspicious",
          explanation: "Domain 'online-gewinn-aktion.com' ist generisch und deutet auf ein unseriöses Gewinnspiel hin."
        }
      ],
      content: [
        {
          text: "1.000€ bei unserem Gewinnspiel gewonnen!",
          type: "suspicious",
          explanation: "Unerwarteter Gewinn, oft ein Lockmittel für Phishing."
        },
        {
          text: "innerhalb von 7 Tagen",
          type: "suspicious",
          explanation: "Zeitdruck soll unüberlegte Handlung provozieren."
        },
        {
          text: "https://online-gewinn-aktion.com/gewinn-anfordern",
          type: "suspicious",
          explanation: "Link führt zu einer verdächtigen Domain, wahrscheinlich eine gefälschte Seite zur Datenerfassung."
        }
      ]
    }
  },
  {
    id: 10,
    subject: "Einladung zum Sommerfest 2024 der Gastart GmbH",
    from: {
      name: "Betriebsrat Gastart GmbH",
      email: "betriebsrat-einladung@gastart.de"
    },
    content: `Liebe Kolleginnen und Kollegen,

der Betriebsrat lädt Sie herzlich zum diesjährigen Sommerfest der Gastart GmbH ein!

Datum: Samstag, 15. Juni 2024
Uhrzeit: ab 17:00 Uhr
Ort: Firmengelände (Parkplatz Süd)

Für Speisen und Getränke ist gesorgt, es erwartet Sie ein buntes Rahmenprogramm mit Musik und Aktivitäten für die ganze Familie.

Wir freuen uns auf einen schönen gemeinsamen Abend!

Viele Grüße,
Ihr Betriebsrat`,
    isPhishing: false,
    explanation: "Legitime interne Einladung zu einer Firmenveranstaltung vom Betriebsrat, verwendet korrekte Firmen-Domain und informellen Ton.",
    highlights: {
      sender: [
        {
          text: "betriebsrat-einladung@gastart.de",
          type: "legitimate",
          explanation: "E-Mail-Adresse verwendet die korrekte Firmen-Domain."
        }
      ],
      content: [
        {
          text: "Sommerfest 2024 der Gastart GmbH",
          type: "legitimate",
          explanation: "Bezug zu einer bekannten Firmenveranstaltung, plausibel im internen Kontext."
        },
        {
          text: "Firmengelände (Parkplatz Süd)",
          type: "legitimate",
          explanation: "Nennung eines spezifischen internen Ortes, deutet auf interne Kommunikation hin."
        },
        {
          text: "Betriebsrat",
          type: "legitimate",
          explanation: "Absender ist eine bekannte interne Organisationseinheit."
        }
      ]
    }
  },
  {
    id: 11,
    subject: "Sicherheitsmeldung: Ihr Microsoft-Konto benötigt Ihre Aufmerksamkeit",
    from: {
      name: "Microsoft Konto Sicherheitsteam",
      email: "microsoft-sicherheit@microsoft-konto-schutz.com"
    },
    content: `Sehr geehrte/r Microsoft-Kunde/Kundin,

wir haben ungewöhnliche Anmeldeaktivitäten in Ihrem Microsoft-Konto festgestellt. Um Ihr Konto zu schützen, haben wir den Zugriff vorübergehend eingeschränkt.

Bitte überprüfen Sie Ihre letzten Aktivitäten und bestätigen Sie Ihre Identität über den folgenden Link:

[Konto überprüfen](https://microsoft-konto-schutz.com/security/verify)

Wenn Sie die Überprüfung nicht innerhalb von 24 Stunden abschließen, wird Ihr Konto dauerhaft gesperrt.

Mit freundlichen Grüßen,
Das Microsoft Sicherheitsteam`,
    isPhishing: true,
    explanation: "Phishing-E-Mail, die eine Sicherheitswarnung von Microsoft vortäuscht, um Benutzer zur Eingabe von Anmeldedaten zu bewegen. Die Domain ist verdächtig.",
    highlights: {
      sender: [
        {
          text: "microsoft-konto-schutz.com",
          type: "suspicious",
          explanation: "Domain 'microsoft-konto-schutz.com' ist nicht die offizielle Microsoft-Domain (microsoft.com)."
        }
      ],
      content: [
        {
          text: "Sicherheitsmeldung: Ihr Microsoft-Konto benötigt Ihre Aufmerksamkeit",
          type: "suspicious",
          explanation: "Alarmierender Betreff, der Angst vor Kontoverlust auslösen soll."
        },
        {
          text: "ungewöhnliche Anmeldeaktivitäten in Ihrem Microsoft-Konto",
          type: "suspicious",
          explanation: "Vage Bedrohung, die Angst vor Kontoverlust auslösen soll."
        },
        {
          text: "innerhalb von 24 Stunden",
          type: "suspicious",
          explanation: "Zeitdruck soll unüberlegte Handlung provozieren."
        },
        {
          text: "https://microsoft-konto-schutz.com/security/verify",
          type: "suspicious",
          explanation: "Link führt zu einer verdächtigen Domain, wahrscheinlich eine gefälschte Microsoft-Login-Seite."
        }
      ]
    }
  },
  {
    id: 12,
    subject: "IT-Support Ticket #20240417-345 - Druckerproblem von Mahir Isikli",
    from: {
      name: "IT-Helpdesk Gastart GmbH",
      email: "it-support@gastart.de"
    },
    content: `Hallo Mahir,

wir haben Ihr IT-Support Ticket #20240417-345 zum Druckerproblem erhalten.

Beschreibung: Drucker im Büro druckt nicht.

Ein Techniker wird sich schnellstmöglich um Ihr Problem kümmern. Wir melden uns bei Ihnen, sobald ein Termin vereinbart wurde.

Vielen Dank für Ihre Geduld.

Mit freundlichen Grüßen,
Ihr IT-Helpdesk Team`,
    isPhishing: false,
    explanation: "Legitime Bestätigung eines IT-Support-Tickets, verwendet korrekte Firmen-Domain und Ticketnummer zur Nachverfolgung.",
    highlights: {
      sender: [
        {
          text: "it-support@gastart.de",
          type: "legitimate",
          explanation: "E-Mail-Adresse verwendet die korrekte Firmen-Domain."
        }
      ],
      content: [
        {
          text: "IT-Support Ticket #20240417-345",
          type: "legitimate",
          explanation: "Verwendung einer Ticketnummer zur Nachverfolgung, typisch für Support-Systeme."
        },
        {
          text: "Drucker im Büro druckt nicht",
          type: "legitimate",
          explanation: "Konkrete Problembeschreibung, plausibel im Arbeitskontext."
        },
        {
          text: "IT-Helpdesk Gastart GmbH",
          type: "legitimate",
          explanation: "Klare Absenderangabe, inklusive Firmenname."
        }
      ]
    }
  },
  {
    id: 13,
    subject: "Letzte Mahnung: Rechnung #2024-00876 - 249,95 EUR fällig!",
    from: {
      name: "Inkasso Service Online",
      email: "inkasso@schnell-inkasso-service24.com"
    },
    content: `Sehr geehrte/r Frau/Herr Schmidt,

trotz mehrfacher Mahnungen haben wir bis heute keinen Zahlungseingang für unsere Rechnung #2024-00876 über 249,95 EUR erhalten.

Dies ist unsere letzte Mahnung. Um weitere Mahngebühren und Inkassokosten zu vermeiden, überweisen Sie den ausstehenden Betrag bitte umgehend auf folgendes Konto:

Empfänger: Inkasso Service Online
Bank: Online Direkt Bank
IBAN: DE87 5001 0517 4829 5738 29

Sollten wir innerhalb von 3 Werktagen keinen Zahlungseingang verzeichnen, leiten wir den Fall ohne weitere Ankündigung an ein Inkassobüro weiter.

Mit freundlichen Grüßen,
Ihr Inkasso Service Online`,
    isPhishing: true,
    explanation: "Phishing-E-Mail, die eine letzte Mahnung vortäuscht, um Benutzer zur schnellen Zahlung auf ein betrügerisches Konto zu bewegen. Die Domain ist verdächtig.",
    highlights: {
      subject: [
        {
          text: "Letzte Mahnung: Rechnung #2024-00876 - 249,95 EUR fällig!",
          type: "suspicious",
          explanation: "Drohender Betreff, der Angst vor Inkassomaßnahmen auslösen soll."
        }
      ],
      sender: [
        {
          text: "schnell-inkasso-service24.com",
          type: "suspicious",
          explanation: "Domain 'schnell-inkasso-service24.com' ist generisch und deutet auf einen unseriösen Inkasso-Service hin."
        }
      ],
      content: [
        {
          text: "Letzte Mahnung",
          type: "suspicious",
          explanation: "Drohende Sprache, typisch für Fake-Mahnungen."
        },
        {
          text: "innerhalb von 3 Werktagen",
          type: "suspicious",
          explanation: "Zeitdruck soll unüberlegte Zahlung provozieren."
        },
        {
          text: "IBAN: DE87 5001 0517 4829 5738 29",
          type: "suspicious",
          explanation: "Bankverbindung könnte zu einem betrügerischen Konto führen."
        }
      ]
    }
  },
  {
    id: 14,
    subject: "Newsletter April-Aktionen bei MediaMarkt",
    from: {
      name: "MediaMarkt Newsletter",
      email: "newsletter@aktionen-mediamarkt.de"
    },
    content: `Hallo MediaMarkt-Kunde,

entdecken Sie die besten Angebote im April in unserem Newsletter!

[Zu den April-Aktionen](https://www.aktionen-mediamarkt.de/april-aktionen)

Profitieren Sie von exklusiven Rabatten und neuen Produkten.

Viel Spaß beim Stöbern!

Ihr Team von MediaMarkt`,
    isPhishing: false,
    explanation: "Legitimer Newsletter eines Online-Shops mit aktuellen Aktionsangeboten, verwendet plausible Domain und typische Newsletter-Inhalte.",
    highlights: {
      sender: [
        {
          text: "newsletter@aktionen-mediamarkt.de",
          type: "legitimate",
          explanation: "E-Mail-Adresse verwendet eine plausible Domain für einen Shop-Newsletter."
        }
      ],
      content: [
        {
          text: "Newsletter April-Aktionen",
          type: "legitimate",
          explanation: "Klarer Betreff, der auf einen Newsletter mit Angeboten hinweist."
        },
        {
          text: "exklusiven Rabatten und neuen Produkten",
          type: "legitimate",
          explanation: "Typische Inhalte eines Newsletters von Online-Shops."
        },
        {
          text: "https://www.aktionen-mediamarkt.de/april-aktionen",
          type: "legitimate",
          explanation: "Link führt zu einer plausiblen Domain für Shop-Aktionen."
        }
      ]
    }
  },
  {
    id: 15,
    subject: "Dringend: Passwort-Reset für Ihr Instagram-Konto erforderlich",
    from: {
      name: "Instagram Support Team",
      email: "security-alert@instagram-hilfe-center.net"
    },
    content: `Hallo Instagram-Nutzer,

wir haben festgestellt, dass Ihr Passwort für Ihr Instagram-Konto möglicherweise kompromittiert wurde. Zu Ihrem Schutz haben wir Ihr Konto vorübergehend gesperrt.

Um Ihr Konto wieder zu aktivieren und ein neues Passwort festzulegen, klicken Sie bitte auf den folgenden Link:

[Passwort zurücksetzen](https://instagram-passwort-reset.hilfe-portal-online.com/reset)

Bitte führen Sie die Passwortzurücksetzung innerhalb von 24 Stunden durch, um eine dauerhafte Sperrung zu vermeiden.

Vielen Dank für Ihre Mithilfe.

Mit freundlichen Grüßen,
Das Instagram Sicherheitsteam`,
    isPhishing: true,
    explanation: "Phishing-E-Mail, die einen Passwort-Reset für Instagram vortäuscht, um Benutzer zur Eingabe von Anmeldedaten zu bewegen. Die Domain ist verdächtig.",
    highlights: {
      sender: [
        {
          text: "instagram-hilfe-center.net",
          type: "suspicious",
          explanation: "Domain 'instagram-hilfe-center.net' ist nicht die offizielle Instagram-Domain (instagram.com)."
        }
      ],
      content: [
        {
          text: "Dringend: Passwort-Reset für Ihr Instagram-Konto erforderlich",
          type: "suspicious",
          explanation: "Alarmierender Betreff, der Dringlichkeit und Angst vor Kontoverlust auslösen soll."
        },
        {
          text: "Passwort für Ihr Instagram-Konto möglicherweise kompromittiert",
          type: "suspicious",
          explanation: "Vage Bedrohung, die Angst vor Kontoverlust auslösen soll."
        },
        {
          text: "innerhalb von 24 Stunden",
          type: "suspicious",
          explanation: "Zeitdruck soll unüberlegte Handlung provozieren."
        },
        {
          text: "https://instagram-passwort-reset.hilfe-portal-online.com/reset",
          type: "suspicious",
          explanation: "Link führt zu einer verdächtigen Domain, wahrscheinlich eine gefälschte Instagram-Login-Seite."
        }
      ]
    }
  },
  {
    id: 16,
    subject: "Mitarbeiterversammlung April 2024 - Einladung",
    from: {
      name: "Geschäftsführung Gastart GmbH",
      email: "geschaeftsfuehrung@gastart.de"
    },
    content: `Sehr geehrte Mitarbeiterinnen und Mitarbeiter,

wir laden Sie herzlich zur nächsten Mitarbeiterversammlung ein.

Datum: Mittwoch, 24. April 2024
Uhrzeit: 14:00 - 15:30 Uhr
Ort: Aula der Gastart GmbH

Tagesordnungspunkte:
- Bericht zur aktuellen Geschäftslage
- Vorstellung neuer Projekte
- Fragen und offene Diskussion

Wir bitten um zahlreiches Erscheinen.

Mit freundlichen Grüßen,
Die Geschäftsführung`,
    isPhishing: false,
    explanation: "Legitime interne Einladung zu einer Mitarbeiterversammlung von der Geschäftsführung, verwendet korrekte Firmen-Domain und formelle Sprache.",
    highlights: {
      sender: [
        {
          text: "geschaeftsfuehrung@gastart.de",
          type: "legitimate",
          explanation: "E-Mail-Adresse verwendet die korrekte Firmen-Domain."
        }
      ],
      content: [
        {
          text: "Mitarbeiterversammlung April 2024 - Einladung",
          type: "legitimate",
          explanation: "Klarer Betreff, der auf eine offizielle interne Veranstaltung hinweist."
        },
        {
          text: "Aula der Gastart GmbH",
          type: "legitimate",
          explanation: "Nennung eines spezifischen internen Ortes, deutet auf interne Kommunikation hin."
        },
        {
          text: "Geschäftsführung Gastart GmbH",
          type: "legitimate",
          explanation: "Klare Absenderangabe, inklusive Firmenname und Hierarchieebene."
        },
        {
          text: "Tagesordnungspunkte",
          type: "legitimate",
          explanation: "Formelle Struktur und Inhalt einer offiziellen Mitteilung."
        }
      ]
    }
  },
  {
    id: 17,
    subject: "Wichtige Information zu Ihrem Stromvertrag - Anpassung der Preise",
    from: {
      name: "Ihr Stromanbieter - EnergieDirekt GmbH",
      email: "kundenservice@energie-direkt-info.net"
    },
    content: `Sehr geehrte/r Frau/Herr Schmidt,

wir möchten Sie über eine wichtige Änderung in Ihrem Stromvertrag informieren. Aufgrund der aktuellen Marktentwicklung und gestiegener Energiepreise sehen wir uns gezwungen, unsere Tarife anzupassen.

Um die Details Ihrer Vertragsänderung einzusehen und zu bestätigen, klicken Sie bitte auf den folgenden Link:

[Vertragsdetails einsehen](https://energie-direkt-vertrag.info/vertrag/details)

Bitte bestätigen Sie die Änderungen bis zum 26. April 2024, um eine reibungslose Weiterversorgung zu gewährleisten.

Mit freundlichen Grüßen,
Ihr Stromanbieter Kundenservice`,
    isPhishing: true,
    explanation: "Phishing-E-Mail, die eine Preisanpassung des Stromvertrags vortäuscht, um Benutzer zur Preisgabe persönlicher Daten zu bewegen. Die Domain ist verdächtig.",
    highlights: {
      sender: [
        {
          text: "energie-direkt-info.net",
          type: "suspicious",
          explanation: "Domain 'energie-direkt-info.net' ist nicht die offizielle Domain eines bekannten Stromanbieters."
        }
      ],
      content: [
        {
          text: "Wichtige Information zu Ihrem Stromvertrag - Anpassung der Preise",
          type: "suspicious",
          explanation: "Alarmierender Betreff, der Besorgnis über steigende Kosten auslösen soll."
        },
        {
          text: "gestiegener Energiepreise",
          type: "suspicious",
          explanation: "Nutzt aktuelle Nachrichtenlage aus, um Glaubwürdigkeit vorzutäuschen."
        },
        {
          text: "https://energie-direkt-vertrag.info/vertrag/details",
          type: "suspicious",
          explanation: "Link führt zu einer verdächtigen Domain, wahrscheinlich eine gefälschte Seite zur Datenerfassung."
        },
        {
          text: "bis zum 26. April 2024",
          type: "suspicious",
          explanation: "Zeitdruck soll unüberlegte Handlung provozieren."
        }
      ]
    }
  },
  {
    id: 18,
    subject: "Feedback-Umfrage zum Projekt 'Website Relaunch'",
    from: {
      name: "PMO - Projektmanagement Office",
      email: "pmo-feedback@gastart.de"
    },
    content: `Hallo Projektteam,

wir bitten um Ihre Teilnahme an einer kurzen Feedback-Umfrage zum kürzlich abgeschlossenen Projekt 'Website Relaunch'.

Ihr Feedback ist uns wichtig, um zukünftige Projekte zu optimieren. Die Umfrage dauert ca. 5 Minuten.

[Zur Feedback-Umfrage](https://umfragen.gastart.de/website-relaunch-feedback)

Vielen Dank für Ihre Unterstützung!

Freundliche Grüße,
Das Projektmanagement Office`,
    isPhishing: false,
    explanation: "Legitime interne Anfrage zur Teilnahme an einer Feedback-Umfrage zu einem Projekt, verwendet korrekte Firmen-Domain und professionelle Sprache.",
    highlights: {
      sender: [
        {
          text: "pmo-feedback@gastart.de",
          type: "legitimate",
          explanation: "E-Mail-Adresse verwendet die korrekte Firmen-Domain."
        }
      ],
      content: [
        {
          text: "Feedback-Umfrage zum Projekt 'Website Relaunch'",
          type: "legitimate",
          explanation: "Klarer Betreff, der auf eine interne Umfrage zu einem Projekt hinweist."
        },
        {
          text: "PMO - Projektmanagement Office",
          type: "legitimate",
          explanation: "Absender ist eine bekannte interne Organisationseinheit."
        },
        {
          text: "umfragen.gastart.de",
          type: "legitimate",
          explanation: "Link verweist auf eine Subdomain der Firmen-Domain für Umfragen, plausibel im internen Kontext."
        }
      ]
    }
  },
  {
    id: 19,
    subject: "Netflix: Ihr Abonnement wurde wegen Zahlungsproblemen pausiert",
    from: {
      name: "Netflix Kundenservice",
      email: "netflix-konto-info@netflix-zahlungsproblem.com"
    },
    content: `Sehr geehrte/r Netflix-Kunde Frau Müller,

leider konnten wir Ihre letzte Zahlung für Ihr Netflix-Abonnement nicht verarbeiten. Ihr Abonnement wurde daher vorübergehend pausiert.

Um Ihr Abonnement wieder zu aktivieren, aktualisieren Sie bitte Ihre Zahlungsinformationen über den folgenden Link:

[Zahlungsinformationen aktualisieren](https://netflix-zahlungsinfos-update.com/payment/update)

Bitte beachten Sie, dass Ihr Abonnement dauerhaft gekündigt wird, wenn Sie Ihre Zahlungsinformationen nicht innerhalb von 7 Tagen aktualisieren.

Mit freundlichen Grüßen,
Ihr Netflix Kundenservice`,
    isPhishing: true,
    explanation: "Phishing-E-Mail, die ein Zahlungsproblem bei Netflix vortäuscht, um Benutzer zur Eingabe von Zahlungsinformationen auf einer gefälschten Seite zu bewegen. Die Domain ist verdächtig.",
    highlights: {
      sender: [
        {
          text: "netflix-zahlungsproblem.com",
          type: "suspicious",
          explanation: "Domain 'netflix-zahlungsproblem.com' ist nicht die offizielle Netflix-Domain (netflix.com)."
        }
      ],
      content: [
        {
          text: "Netflix: Ihr Abonnement wurde wegen Zahlungsproblemen pausiert",
          type: "suspicious",
          explanation: "Alarmierender Betreff, der Angst vor Abonnementverlust auslösen soll."
        },
        {
          text: "Zahlungsproblemen pausiert",
          type: "suspicious",
          explanation: "Vorgegebener Grund, um Benutzer zur Aktualisierung der Zahlungsinformationen zu bewegen."
        },
        {
          text: "innerhalb von 7 Tagen",
          type: "suspicious",
          explanation: "Zeitdruck soll unüberlegte Handlung provozieren."
        },
        {
          text: "https://netflix-zahlungsinfos-update.com/payment/update",
          type: "suspicious",
          explanation: "Link führt zu einer verdächtigen Domain, wahrscheinlich eine gefälschte Seite zur Datenerfassung."
        }
      ]
    }
  },
  {
    id: 20,
    subject: "Information: Geplante Systemwartung am kommenden Samstag",
    from: {
      name: "IT-Abteilung Gastart GmbH",
      email: "it-wartung@gastart.de"
    },
    content: `Sehr geehrte Mitarbeiterinnen und Mitarbeiter,

wir informieren Sie über eine geplante Systemwartung am kommenden Samstag, den 20. April 2024.

Zeitraum: 06:00 Uhr bis 18:00 Uhr

Während dieser Zeit kann es zu Einschränkungen bei der Verfügbarkeit einiger IT-Systeme kommen, insbesondere beim Zugriff auf das Firmennetzwerk und bestimmte Anwendungen.

Wir bitten um Ihr Verständnis und werden versuchen, die Ausfallzeiten so gering wie möglich zu halten.

Vielen Dank!

Mit freundlichen Grüßen,
Ihre IT-Abteilung`,
    isPhishing: false,
    explanation: "Legitime interne Information über geplante IT-Systemwartung, verwendet korrekte Firmen-Domain und sachliche Sprache.",
    highlights: {
      sender: [
        {
          text: "it-wartung@gastart.de",
          type: "legitimate",
          explanation: "E-Mail-Adresse verwendet die korrekte Firmen-Domain."
        }
      ],
      content: [
        {
          text: "Geplante Systemwartung am kommenden Samstag",
          type: "legitimate",
          explanation: "Klarer Betreff, der auf eine geplante interne Wartung hinweist."
        },
        {
          text: "IT-Abteilung Gastart GmbH",
          type: "legitimate",
          explanation: "Klare Absenderangabe, inklusive Firmenname."
        },
        {
          text: "Einschränkungen bei der Verfügbarkeit einiger IT-Systeme",
          type: "legitimate",
          explanation: "Sachliche Information über mögliche Auswirkungen der Wartung."
        }
      ]
    }
  }
];