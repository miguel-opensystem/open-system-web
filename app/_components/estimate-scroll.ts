export const ESTIMATE_ID = "estimate";
export const AUDIENCE_INPUT_ID = "calc-audience";

/** Centers the Step 1 wizard card and focuses the audience slider. */
export function scrollToEstimate(behavior: ScrollBehavior = "smooth") {
  const card = document.getElementById(ESTIMATE_ID);
  if (!card) return false;

  card.scrollIntoView({ behavior, block: "center", inline: "nearest" });

  const focus = () => {
    document.getElementById(AUDIENCE_INPUT_ID)?.focus({ preventScroll: true });
  };

  if (behavior !== "smooth") {
    focus();
    return true;
  }

  let done = false;
  const run = () => {
    if (done) return;
    done = true;
    document.removeEventListener("scrollend", run);
    focus();
  };

  document.addEventListener("scrollend", run);
  window.setTimeout(run, 900);
  return true;
}
