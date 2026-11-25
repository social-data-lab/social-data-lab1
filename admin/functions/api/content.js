
export async function onRequestGet({ env }) {
  try {
    const content = await env.DB
      .prepare("SELECT page_key, title, body FROM site_content")
      .all();

    const settings = await env.DB
      .prepare("SELECT setting_key, setting_value FROM site_settings")
      .all();

    return Response.json({
      content: content.results,
      settings: settings.results
    });
  } catch (error) {
    return Response.json(
      { error: "خطا در دریافت اطلاعات سایت" },
      { status: 500 }
    );
  }
}
