import React, { Children, useEffect, useState, ReactNode } from "react";

import { negotiateLanguages } from "@fluent/langneg";
import { FluentBundle, FluentResource } from "@fluent/bundle";
import { ReactLocalization, LocalizationProvider, useLocalization } from "@fluent/react";

//let { l10n } = useLocalization();
//alert(l10n.getString("hello"));

export interface LabeledId {
  id: string
  label: string
}
interface AppLocalizationProviderProps {
  children: ReactNode;
  locale: string
  locales: LabeledId[]
}

export function AppLocalizationProvider(props: AppLocalizationProviderProps) {

  async function fetchMessages(locale: string): Promise<[string, string]> {
    const url = locale + ".ftl";
    let response = await fetch(url);
    console.log("fetch ", locale, response)
    let messages = await response.text();
    return [locale, messages];
  }

  function* lazilyParsedBundles(fetchedMessages: Array<[string, string]>) {
    for (let [locale, messages] of fetchedMessages) {
      let resource = new FluentResource(messages);
      let bundle = new FluentBundle(locale);
      bundle.addResource(resource);
      yield bundle;
    }
  }

  async function changeLocales(userLocales: Array<string>) {
    let currentLocales = negotiateLanguages(
      userLocales,
      props.locales.map((e)=>e.id),
      { defaultLocale: props.locale }
    );
    setCurrentLocales(currentLocales);
    let fetchedMessages = await Promise.all(currentLocales.map(fetchMessages));
    let bundles = lazilyParsedBundles(fetchedMessages);
    setL10n(new ReactLocalization(bundles));
  }

  let [currentLocales, setCurrentLocales] = useState([props.locale]);
  let [l10n, setL10n] = useState<ReactLocalization | null>(null);
  useEffect(() => {
    changeLocales(['es']) //navigator.languages as Array<string>);
  }, []);

  if (l10n === null) {
    return <div>Loading…</div>;
  }
  return (
    <>
      <LocalizationProvider l10n={l10n}>
        {Children.only(props.children)}
      </LocalizationProvider>
    </>
  );
}


/*

      <hr />
      <select
        onChange={event => changeLocales([event.target.value])}
        value={currentLocales[0]}
      >
        {Object.entries(AVAILABLE_LOCALES).map(([code, name]) => (
          <option key={code} value={code}>
            {name}
          </option>
        ))}
      </select>
*/